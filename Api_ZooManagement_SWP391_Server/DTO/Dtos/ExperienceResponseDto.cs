using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class ExperienceResponseDto
    {
        public List<ExperienceDetailDto> Experiences { get; set; } = new List<ExperienceDetailDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
