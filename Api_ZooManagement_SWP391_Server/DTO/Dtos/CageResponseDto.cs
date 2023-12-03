using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class CageResponseDto
    {
        public List<CageDto> Cages { get; set; } = new List<CageDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
