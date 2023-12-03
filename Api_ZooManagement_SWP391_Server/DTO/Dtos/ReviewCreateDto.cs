using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class ReviewCreateDto
    {
        public string Email { get; set; } = string.Empty;
        public string CompleteName { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
