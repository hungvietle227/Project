using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class FoodCategory
    {
        public string CategoryId { get; set; }
        public string CategoryName { get; set; }
        public ICollection<Food> Foods { get; set; }
    }
}
