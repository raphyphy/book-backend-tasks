using BookAPI.Entities;
using BookAPI.Repositories.Base;
using BookAPI.Repositories.Interfaces;

namespace BookAPI.Repositories
{
    public class BookRepository: BaseRepository<Book>, IBookRepository
    {
        public BookRepository(AppContext context) : base(context)
        {
        }
    }
}
