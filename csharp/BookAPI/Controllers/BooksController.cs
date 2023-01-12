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
        private IBookService _bookService;

        public BooksController(IBookRepository bookRepository)
        {
            _bookService = new BookService(this.ModelState, bookRepository);
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return Ok(await _bookService.GetBooks());
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
            return Ok(await _bookService.GetBookById(bookId));
        }

        [HttpDelete]
        [Route("{bookId}")]
        public async Task<ActionResult<Book>> DeleteBookById(string bookId)
        {
            return Ok(await _bookService.RemoveBook(bookId));
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
