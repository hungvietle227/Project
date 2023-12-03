using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class FoodMeal
    {
        public string MealId { get; set; }
        public string FoodId { get; set; }
        public double Quantity { get; set; }
        public string Unit { get; set; }
        public Meal Meal { get; set; }
        public Food Food { get; set; }
    }
}
