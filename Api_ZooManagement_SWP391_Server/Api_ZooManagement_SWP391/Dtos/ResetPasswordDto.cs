using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api_ZooManagement_SWP391.Dtos
{
    public class ResetPasswordDto
    {
        [Required]
        public string Token { get; set; } = string.Empty;
        [Required, MinLength(6, ErrorMessage = "Please enter at least 6 characters!!")]
        public string Password { get; set; } = string.Empty;
        [Required, Compare("Password")]
        public string PasswordConfirmation { get; set; } = string.Empty;
    }
}
