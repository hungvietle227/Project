using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class Food
    {
        public string FoodId { get; set; }
        public string FName { get; set; }
        public double Quantity { get; set; }
        public string Unit { get; set; }
        public DateTime ImportDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public FoodCategory Category { get; set; }
        public string CategoryId { get; set; }

        public ICollection<FoodMeal> FoodMeals { get; set; } 
    }
}
