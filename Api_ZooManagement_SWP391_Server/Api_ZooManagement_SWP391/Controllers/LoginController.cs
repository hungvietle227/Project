using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using DTO.Dtos;
using BBL.Interfaces;
using DAL.Entities;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public LoginController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        private User Authentication(LoginDto user)
        {
            var user_ = _userService.CheckLogin(user.Email, user.Password);
            if ( user_ != null)
            {
                return user_;
            }
            return null;
        }

        private string GenerateToken(TokenDto userToken)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, userToken.Email),
                new Claim(ClaimTypes.Name, userToken.FullName),
                new Claim(ClaimTypes.Role, userToken.Role.ToString())
            };
            var securityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto user)
        {
            
            var adminUser = _configuration.GetValue<string>("AdminAccount:Email");
            var adminName = _configuration.GetValue<string>("AdminAccount:Name");
            var adminPassword = _configuration.GetValue<string>("AdminAccount:Password");
            TokenDto token = null;
            if (user.Email == adminUser && user.Password == adminPassword)
            {
                token = new TokenDto
                {
                    Email = adminUser,
                    FullName = adminName,
                    Role = Role.ADMIN
                };
            }
            else
            {
                var user_ = Authentication(user);
                if (user_ == null)
                {
                    return BadRequest("User not found.");
                }
                token = new TokenDto
                {
                    Email = user_.Email,
                    FullName = user_.Firstname + " " + user_.Lastname,
                    Role = user_.Role
                };
            }

            string _token = GenerateToken(token);
            return Ok(_token);
        }

        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword(string email)
        {
            var user = _userService.GetByEmail(email);

            if (user == null)
            {
                return BadRequest("invalid email");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var resetToken = CreateRandomToken().ToString();

            var result = _userService.ForgotPassword(user, resetToken);

            if (!result)
            {
                return BadRequest("invalid token");
            }

            return Ok("you can reset your password");

        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword([FromQuery]ResetPasswordDto request)
        {
            var user = _userService.GetUsers().Where(user => user.ResetPassToken == request.Token).FirstOrDefault();

            if(user == null || user.ResetTokenExpires < DateTime.Now)
            {
                return BadRequest("Invalid Token");
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var result = _userService.ResetPassword(user, passwordHash, passwordSalt);
            if(!result)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok("Reset Successfully");

        }

        private object CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
