using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class OldUsersDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime StartTrainDate { get; set; }
        public DateTime? EndTrainDate { get; set; }
    }
}
