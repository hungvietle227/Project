using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class AnimalFoodCreateDto
    {
        public string FoodId { get; set; }
        public DateTime StartEat { get; set; }
        public DateTime EndEat { get; set; }
        public double Amount { get; set; }
    }
}
