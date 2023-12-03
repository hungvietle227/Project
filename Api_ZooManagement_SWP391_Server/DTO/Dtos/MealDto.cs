using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class MealDto
    {
        public string MealId { get; set; }
        public string MealName { get; set; }
        public List<GetFoodMealDto> FoodMealDtos { get; set; } = new List<GetFoodMealDto>();
    }
}
