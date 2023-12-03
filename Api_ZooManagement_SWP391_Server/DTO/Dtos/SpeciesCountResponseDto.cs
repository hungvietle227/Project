using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class SpeciesCountResponseDto
    {
        public List<GetSpeciesDto> Species { get; set; } = new List<GetSpeciesDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
