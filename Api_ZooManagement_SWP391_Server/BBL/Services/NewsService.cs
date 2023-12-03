using BBL.Interfaces;
using DAL.Data;
using DAL.Entities;
using DAL.Repositories;
using DTO.Dtos;

namespace BBL.Services
{
    public class NewsService : INewsService
    {
        private readonly IGenericRepository<News> _newsRepo;
        private readonly DataContext _context;

        public NewsService(IGenericRepository<News> newsRepo, DataContext context)
        {
            _newsRepo = newsRepo;
            _context = context;
        }
        public bool AddNews(News news)
        {
            return _newsRepo.Add(news);
        }

        public bool DeleteNews(string newsId)
        {
            var news = _newsRepo.GetById(newsId);
            if (news == null) return false;
            news.Status = false;
            return _newsRepo.Update(news);
        }

        public ICollection<News> GetAcceptedNews()
        {
            return _newsRepo.GetAll().Where(news => news.Status == true && news.Checked == true).ToList();
        }

        public ICollection<News> GetAllNews()
        {
            return  _newsRepo.GetAll();
        }

        public ICollection<News> GetDeniedNews()
        {
            return _newsRepo.GetAll().Where(news => news.Status == true && news.Checked == false).ToList();
        }

        public News GetNews(string id)
        {
            return _newsRepo.GetById(id);
        }

        public ICollection<News> GetNewsByStaffId(string userId)
        {
            return _newsRepo.GetAll().Where(news => news.UserId == userId).ToList();
        }

        public bool NewsExists(string id)
        {
            var news = _newsRepo.GetById(id);
            if (news != null)
                return true;
            return false;
        }

        public bool UpdateNews(News newsMap)
        {
            var review = _newsRepo.GetById(newsMap.NewsId);
            if (review == null) return false;
            review.NewsTitle = newsMap.NewsTitle;
            review.ReleaseDate = newsMap.ReleaseDate;
            review.NewsContent = newsMap.NewsContent;
            review.Status = newsMap.Status;
            review.Checked = newsMap.Checked;
            review.NewsImage = newsMap.NewsImage;
            return _newsRepo.Update(review);
        }
    }
}
