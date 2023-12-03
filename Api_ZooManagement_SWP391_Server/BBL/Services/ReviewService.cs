using BBL.Interfaces;
using DAL.Data;
using DAL.Entities;
using DAL.Repositories;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using MimeKit.Text;
using MimeKit;
using Microsoft.Extensions.Configuration;

namespace BBL.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IGenericRepository<Review> _reviewRepository;
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        public ReviewService(IGenericRepository<Review> reviewRepository, DataContext context, IConfiguration config)
        {
            _reviewRepository = reviewRepository;
            _context = context;
            _config = config;
        }

        public bool AddReview(Review review)
        {
            if (review != null)
            {
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("mapmapzoofpt@gmail.com"));
                email.To.Add(MailboxAddress.Parse(review.Email));
                email.Subject = "Thanks for feedback";
                email.Body = new TextPart(TextFormat.Html)
                {
                    Text = "<form action=\"\">\r\n\r\n  <h2>Thank you for your feedback about MapMap Zoo</h2>\r\n\r\n  <p>We will try to improve the things that make you unhappy. See you next time!!!</p> </form>"
                };

                using var smtp = new MailKit.Net.Smtp.SmtpClient();
                smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
                smtp.Authenticate(_config.GetSection("EmailUser").Value, _config.GetSection("EmailPassword").Value);
                smtp.Send(email);
                smtp.Disconnect(true);
                return _reviewRepository.Add(review);
            }
            
            return false;
        }

        public ICollection<Review> GetAllReview()
        {
            return _reviewRepository.GetAll();
        }

        public Review GetReview(string id)
        {
            return _reviewRepository.GetById(id);
        }

        public bool ReviewExists(string id)
        {
            return _reviewRepository.GetById(id) != null ? true : false;
        }

    }
}
