using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class NewsCreateDto
    {
        public string NewsTitle { get; set; } = string.Empty;
        public string NewsContent { get; set; } = string.Empty;
        public string? NewsImage { get; set; }
    }
}
