using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class NewsResponseDto
    {
        public List<NewsDto> News { get; set; } = new List<NewsDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
