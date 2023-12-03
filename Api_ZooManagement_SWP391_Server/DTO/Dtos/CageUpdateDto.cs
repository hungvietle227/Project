using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class CageUpdateDto
    {
        public string CId { get; set; }
        public string Name { get; set; }
        public int MaxCapacity { get; set; }
    }
}
