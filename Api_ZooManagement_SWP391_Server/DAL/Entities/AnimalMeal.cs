using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class AnimalMeal
    {
        public string MealId { get; set; }
        public string AnimalId { get; set; }
        public DateTime StartEat { get; set; }
        public DateTime? EndEat { get; set; }
        public Animal Animal { get; set; }
        public Meal Meal { get; set; }
    }
}
