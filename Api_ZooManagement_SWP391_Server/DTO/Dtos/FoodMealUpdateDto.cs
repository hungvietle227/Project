using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class FoodMealUpdateDto
    {
        public string FoodId { get; set; }
        public double Quantity { get; set; }
        public string Unit { get; set; }
    }
}
