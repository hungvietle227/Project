using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class GetAnimalScheduleDto
    {
        public string ScheduleId { get; set; }
        public string ScheduleName { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; }
    }
}
