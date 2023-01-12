using System.Linq.Expressions;

namespace BookAPI.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        // it's still strange to me that even methods are capitalized in C#
        Task<T> FindOne(string id);
        Task<IEnumerable<T>> Find();
        void Create(T entity);
        void Update(T entity);
        void Delete(string id);
        Task<bool> SaveChangesAsync();
    }
}
