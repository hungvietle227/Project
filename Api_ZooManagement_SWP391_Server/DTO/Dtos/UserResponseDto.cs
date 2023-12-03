using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class UserResponseDto
    {
        public List<UserDto> Users { get; set; } = new List<UserDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
