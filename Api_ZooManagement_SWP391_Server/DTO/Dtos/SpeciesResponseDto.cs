using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class SpeciesResponseDto
    {
        public List<SpeciesDto> Species { get; set; } = new List<SpeciesDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
