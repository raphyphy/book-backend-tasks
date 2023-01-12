using BookAPI.Entities;
using BookAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BookAPI.Services
{
    public class BookService : IBookService
    {
        private ModelStateDictionary _modelState;
        private IBookRepository _bookRepository;

        public BookService(ModelStateDictionary modelState, IBookRepository bookRepository)
        {
            _modelState = modelState;
            _bookRepository = bookRepository;
        }

        protected bool ValidateBook(Book bookToValidate)
        {
            if (bookToValidate.name.Trim().Length == 0)
                _modelState.AddModelError("Name", "Name is required");
            if (bookToValidate.title.Trim().Length == 0)
                _modelState.AddModelError("Title", "Title is required");
            // Add more validation here.
            return _modelState.IsValid;
        }

        public async Task<bool> CreateBook(BookDetailDto bookToCreate)
        {
            var book = new Book() // it would be lovely for c# to have native object destructuring innit?
            {
                title = bookToCreate.title,
                isbn = bookToCreate.isbn,
                name = bookToCreate.name,
                year = bookToCreate.year,
                Id = Guid.NewGuid().ToString()
            };
            if (!ValidateBook(book))
                return false;

            try
            {
                _bookRepository.Create(book);
                await _bookRepository.SaveChangesAsync();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<bool> UpdateBook(string bookId, BookDetailDto bookToUpdate)
        {
            try
            {
                var book = new Book()
                {
                    title = bookToUpdate.title,
                    isbn = bookToUpdate.isbn,
                    name = bookToUpdate.name,
                    year = bookToUpdate.year,
                    Id = bookId
                };
                _bookRepository.Update(book);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<Book> GetBookById(string bookId)
        {
            return await _bookRepository.FindOne(bookId);
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            return await _bookRepository.Find();
        }
        public async Task<bool> RemoveBook(string bookId)
        {
            try
            {
                _bookRepository.Delete(bookId);
                await _bookRepository.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
    public interface IBookService
    {
        Task<bool> CreateBook(BookDetailDto bookToCreate);
        Task<bool> UpdateBook(string bookId, BookDetailDto bookToCreate);
        Task<Book> GetBookById(string bookId);
        Task<IEnumerable<Book>> GetBooks();
        Task<bool> RemoveBook(string bookId);
    }
}
