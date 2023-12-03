using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class MealResponseDto
    {
        public List<MealDto> Meals { get; set; } = new List<MealDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
