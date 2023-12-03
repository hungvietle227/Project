using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class CreateMealDto
    {
        public string MealName { get; set; }
        public List<FoodMealDto> FoodMeals {  get; set; }
    }
}
