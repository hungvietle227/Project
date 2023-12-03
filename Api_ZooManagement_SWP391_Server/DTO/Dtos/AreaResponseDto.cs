using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class AreaResponseDto
    {
        public List<AreaDto> Areas { get; set; } = new List<AreaDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
