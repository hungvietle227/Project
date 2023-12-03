using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class OldCagesDto
    {
        public string CId { get; set; }
        public string Name { get; set; }
        public DateTime EntryCageDate { get; set; }
        public DateTime? OutCageDate { get; set; }
    }
}
