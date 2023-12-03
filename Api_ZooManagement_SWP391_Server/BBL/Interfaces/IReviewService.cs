using DAL.Entities;

namespace BBL.Interfaces
{
    public interface IReviewService
    {
        bool AddReview(Review review);
        Review GetReview(string id);
        ICollection<Review> GetAllReview();
        bool ReviewExists(string id);
    }
}
