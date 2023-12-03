using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class FoodCreateDto
    {
        public string FName { get; set; }
        public double Quantity { get; set; }
        public DateTime ImportDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public string Unit {  get; set; }
        public string CategoryName { get; set; }
    }
}
