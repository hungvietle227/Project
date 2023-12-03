using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class OrderResponseDto
    {
        public List<OrderDto> Orders { get; set; } = new List<OrderDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
