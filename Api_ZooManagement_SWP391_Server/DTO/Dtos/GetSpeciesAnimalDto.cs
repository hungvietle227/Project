using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class GetSpeciesAnimalDto
    {
        public string SpeciesId { get; set; }
        public string SpeciesName { get; set; }
        public ICollection<GetAnimalDto> Animals { get; set; }
    }
}
