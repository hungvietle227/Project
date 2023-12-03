using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class CreateAnimalMealDto
    {
        public string MealId { get; set; }
        public DateTime StartEat { get; set; }
        public DateTime? EndEat { get; set; }
    }
}
