using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dtos
{
    public class AvailableTrainer
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public bool Sex { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Status { get; set; }
        public string? RefreshToken { get; set; }
        public string? ResetPassToken { get; set; }
        public DateTime? ResetTokenExpires { get; set; }
        public Role Role { get; set; }
        public int CountAnimal { get; set; }
    }
}
