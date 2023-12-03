using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class Guest
    {
        [EmailAddress]
        public string Email {  get; set; }
        public string FullName {  get; set; }
        public string PhoneNumber { get; set; }

        public ICollection<Order> Orders { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}
