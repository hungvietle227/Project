using DTO.Dtos;
using AutoMapper;
using BBL.Interfaces;
using DAL.Entities;
using DAL.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IAnimalService _animalService;

        public UserController(IMapper mapper, 
                              IUserService userService,
                              IAnimalService animalService)
        {
            _mapper = mapper;
            _userService = userService;
            _animalService = animalService;
        }

        [HttpGet("users")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserDto>))]
        public IActionResult GetUsers()
        {
            var users = _userService.GetAllUsers();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(users);
        }

        [HttpGet("total")]
        [ProducesResponseType(200, Type = typeof(int))]
        public IActionResult GetNumOfEmployee()
        {
            return Ok(_userService.GetAllUsers().Count());
        }

        [HttpGet("users/active")]
        [ProducesResponseType(200, Type= typeof(IEnumerable<UserDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetActiveUsers()
        {
            var users = _mapper.Map<List<UserDto>>(_userService.GetActiveUsers());
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(users);
        }

        [HttpGet("users/available")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetUserAvailable()
        {
            var users = _userService.GetAllUsers();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok();
        }

        [HttpGet("AvailableTrainers")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult GetTrainersAvailable()
        {
            var user = _mapper.Map<List<AvailableTrainer>>(_userService.GetTrainersCanTrain());
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(user);
        }

        [HttpGet("page/{page}")]
        [ProducesResponseType(200, Type = typeof(UserResponseDto))]
        public IActionResult GetUsers(int page)
        {
            var users = _userService.GetAllUsers();
            if (users == null || users.Count() == 0)
                return NotFound();

            var pageResults = 10f;
            var pageCount = Math.Ceiling(users.Count() / pageResults);

            var result = users
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new UserResponseDto
            {
                Users = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpGet("users/{email}")]
        [ProducesResponseType(200, Type = typeof(UserDto))]
        public IActionResult GetUserByEmail(string email)
        {
            if (email == null)
                return BadRequest();

            var user = _userService.GetUserByEmail(email);

            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [HttpGet("trainers/pages/{page}")]
        [ProducesResponseType(200, Type = typeof(UserResponseDto))]
        public IActionResult GetTrainers(int page)
        {
            var users = _userService.GetTrainers();
            if (users == null || users.Count() == 0)
                return NotFound();

            var pageResults = 10f;
            var pageCount = Math.Ceiling(users.Count() / pageResults);

            var result = users
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new UserResponseDto
            {
                Users = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpGet("staffs/pages/{page}")]
        [ProducesResponseType(200, Type = typeof(UserResponseDto))]
        public IActionResult GetStaffs(int page)
        {
            var users = _userService.GetStaffs();
            if (users == null || users.Count() == 0)
                return NotFound();

            var pageResults = 10f;
            var pageCount = Math.Ceiling(users.Count() / pageResults);

            var result = users
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new UserResponseDto
            {
                Users = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult CreateUser([FromBody] UserCreateDto userCreate)
        {
            if (userCreate == null)
                return BadRequest();

            var users = _userService.GetUsers()
                .Where(c => c.Email.Trim().ToUpper() == userCreate.Email.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (users != null)
            {
                ModelState.AddModelError("", "User already exists");
                return StatusCode(422, ModelState);
            }

            var user = _mapper.Map<User>(userCreate);
            if (_userService.GetUserByPhone(userCreate.Phone) != null)
            {
                return BadRequest("Phone Existed!!");
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            string userId = "";
            int count = _userService.GetTotalUserByRole(user.Role) + 1;

            CreatePasswordHash("123456", out byte[] passwordHash, out byte[] passwordSalt);


            if(UserRoleExtensions.ToIntValue(user.Role) == 2) 
               userId = "ST" + count.ToString().PadLeft(4, '0');
            else if(UserRoleExtensions.ToIntValue(user.Role) == 3)
               userId = "ZT" + count.ToString().PadLeft(4, '0');
            
            user.UserId = userId; 
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.StartDate = DateTime.Now;
            user.CountAnimal = 0;
            user.Status = true;

            if (!_userService.Add(userCreate.Experiences, user))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successful Created");
        }

        [HttpPut("{userId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult UpdateUser(string userId, [FromBody] UserUpdateDto updateUser)
        {
            if (updateUser == null)
                return BadRequest(ModelState);

            if (userId != updateUser.UserId)
                return BadRequest(ModelState);

            if (!_userService.UserExists(userId))
                return NotFound("User does not exist");

            var user = _userService.GetById(userId);
            if (updateUser.EndDate <= user.StartDate)
                return BadRequest("End date must be greater than start date");

            var userMap = _mapper.Map<User>(updateUser);

            if (user.Phone != userMap.Phone &&
                _userService.GetUserByPhone(userMap.Phone) != null)
            {
                return BadRequest("Phone Existed!!");
            }

            if (!ModelState.IsValid)
                return BadRequest();

            if (!_userService.Update(user, userMap))
            {
                ModelState.AddModelError("", "Error when updating user!!");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{userId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult DeleteUser(string userId)
        {
            if (!_userService.UserExists(userId))
            {
                return NotFound();
            }

            var animals = _userService.GetAnimalsByUserId(userId);

            if (animals != null)
                return BadRequest("User still manage animals!!!");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_userService.DeleteUser(userId))
            {
                ModelState.AddModelError("", "Something went wrong while deleting user");
            }

            return NoContent();
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
