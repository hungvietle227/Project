using DAL.Data;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {

        protected readonly DataContext _context;
        protected readonly DbSet<T> _dbSet;

        public GenericRepository(DataContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }
        public bool Add(T entity)
        {
            _dbSet.Add(entity);
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public ICollection<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public T GetById(string id)
        {
            return _dbSet.Find(id);
        }

        public bool Update(T entity)
        {
            _dbSet.Update(entity);
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
        public bool Delete(T entity)
        {
            _dbSet.Remove(entity);
            var deleted = _context.SaveChanges();
            return deleted > 0 ? true : false;
        }
    }
}
