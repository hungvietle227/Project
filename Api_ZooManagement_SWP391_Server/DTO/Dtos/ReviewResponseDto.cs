using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class ReviewResponseDto
    {
        public List<ReviewDto> Reviews { get; set; } = new List<ReviewDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
