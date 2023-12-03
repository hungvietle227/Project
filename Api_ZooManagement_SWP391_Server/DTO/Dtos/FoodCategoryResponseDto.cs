using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class FoodCategoryResponseDto
    {
        public List<FoodCategoryPaginationDto> FoodCategories { get; set; } = new List<FoodCategoryPaginationDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
