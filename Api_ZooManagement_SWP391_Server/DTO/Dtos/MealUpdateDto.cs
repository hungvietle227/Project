using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class MealUpdateDto
    {
        public string MealId { get; set; }
        public List<FoodMealUpdateDto> FoodMeals { get; set; }
    }
}
