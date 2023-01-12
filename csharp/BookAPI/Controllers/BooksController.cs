using BookAPI.Entities;
using BookAPI.Repositories.Interfaces;
using BookAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private IBookRepository _bookRepository;
        private IBookService _bookService;

        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
            _bookService = new BookService(this.ModelState, bookRepository);
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return Ok(await _bookRepository.Find());
        }

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public async Task<IActionResult> AddBook([FromBody] BookDetailDto bookDetails)
        {
            return Ok(await _bookService.CreateBook(bookDetails));
        }

        [HttpGet]
        [Route("{bookId}")]
        public async Task<ActionResult<Book>> GetBookById(string bookId)
        {
            return Ok(await _bookRepository.FindOne(bookId));
        }

        [HttpDelete]
        [Route("{bookId}")]
        public async Task<ActionResult<Book>> DeleteBookById(string bookId)
        {
            _bookRepository.Delete(bookId);
            return Ok(await _bookRepository.SaveChangesAsync());
        }

        [HttpPut]
        [Route("{bookId}")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateBook(string bookId, [FromBody] BookDetailDto bookDetails)
        {
            return Ok(await _bookService.UpdateBook(bookId, bookDetails));
        }
    }
}
