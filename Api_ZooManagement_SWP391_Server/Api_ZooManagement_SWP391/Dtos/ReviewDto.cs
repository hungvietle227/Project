using DAL.Entities;

namespace Api_ZooManagement_SWP391.Dtos
{
    public class ReviewDto
    {
        public class Review
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public float Rating { get; set; }

        }
    }
}
