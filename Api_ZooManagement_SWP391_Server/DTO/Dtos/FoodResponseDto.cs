using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class FoodResponseDto
    {
        public List<FoodDto> Foods { get; set; } = new List<FoodDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
