using DAL.Entities;
using DTO.Dtos;

namespace BBL.Interfaces
{
    public interface INewsService
    {
        bool AddNews(News news);
        bool UpdateNews(News newsmap);
        bool DeleteNews(string newsId);
        News GetNews(string id);
        ICollection<News> GetAllNews();
        ICollection<News> GetNewsByStaffId(string userId);
        ICollection<News> GetAcceptedNews();
        ICollection<News> GetDeniedNews();
        bool NewsExists(string id);
    }
}
