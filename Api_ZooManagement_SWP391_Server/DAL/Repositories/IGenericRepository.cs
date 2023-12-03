namespace DAL.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        bool Add(T entity);
        bool Update(T entity);
        ICollection<T> GetAll();
        T GetById(string id);
        bool Delete(T entity);
    }
}
