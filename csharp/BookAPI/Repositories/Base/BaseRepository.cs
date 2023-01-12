using BookAPI.Entities;
using BookAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BookAPI.Repositories.Base
{
    public class BaseRepository<T>: IRepository<T> where T : class
    {
        protected readonly AppContext _context;
        protected readonly DbSet<T> _dbSet;
        public BaseRepository(AppContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }
        public async Task<T> FindOne(string id)
        {
            return await _dbSet.FindAsync(id);
        }
        public async Task<IEnumerable<T>> Find()
        {
            return await _dbSet.ToListAsync();
        }
        public void Delete(string id)
        {
            T entity = _dbSet.Find(id);
            _dbSet.Attach(entity);
            _dbSet.Remove(entity);

        }
        public void Create(T entity)
        {
            _dbSet.Add(entity);
        }
        public void Update(T entity)
        {
            _context.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync().ConfigureAwait(false) > 0;
        }
    }
}
