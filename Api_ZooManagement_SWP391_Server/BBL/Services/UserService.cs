using BBL.Interfaces;
using DAL.Data;
using DTO.Dtos;
using DAL.Entities;
using DAL.Repositories;
using System.Security.Cryptography;
using Microsoft.Extensions.Configuration;
using System.Net.Mail;
using MimeKit;
using MailKit.Security;
using MimeKit.Text;
using MailKit.Net.Smtp;
using AutoMapper;
using System.Text.RegularExpressions;

namespace BBL.Services
{

    public class UserService : IUserService
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly IGenericRepository<WorkExperience> _workExpRepository;
        private readonly IGenericRepository<ExperienceDetail> _expDetailRepository;
        private readonly IGenericRepository<AnimalTrainer> _aniTrainerRepository;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private Regex x = new Regex(@"^ZT\d{4}");

        public UserService(IGenericRepository<User> userRepository,
                           IGenericRepository<WorkExperience> workExpRepository,
                           IGenericRepository<ExperienceDetail> expDetailRepository,
                           IConfiguration config,
                           IGenericRepository<AnimalTrainer> aniTrainerRepository,
                           IMapper mapper)
        {
            _userRepository = userRepository;
            _workExpRepository = workExpRepository;
            _expDetailRepository = expDetailRepository;
            _aniTrainerRepository = aniTrainerRepository;
            _config = config;
            _mapper = mapper;
        }

        public bool Add(List<ExperienceUserDto> experiences, User user)
        {
            if(_userRepository.Add(user))
            {
                if (experiences != null && experiences.Count() > 0)
                {
                    foreach(var experience in experiences)
                    {
                        var workExp = _workExpRepository.GetById(experience.ExperienceId);
                        if (workExp == null) return false;
                        var expDetail = new ExperienceDetail()
                        {
                            User = user,
                            WorkExperience = workExp,
                            Company = experience.Company,
                        };

                        _expDetailRepository.Add(expDetail);
                    }
                }
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("mapmapzoofpt@gmail.com"));
                email.To.Add(MailboxAddress.Parse(user.Email));
                email.Subject = "Welcome to our Mapmap zoo";
                email.Body = new TextPart(TextFormat.Text)
                {
                    Text = " This is your account details: "
                                                                    + "\nYour account number is: " + user.Email
                                                                    + "\nYour password is: " + 123456
                                                                    + "\nMapMap Zoo thank you for join with us. Wish you have a good day!!!"
                };

                using var smtp = new MailKit.Net.Smtp.SmtpClient();
                smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
                smtp.Authenticate(_config.GetSection("EmailUser").Value, _config.GetSection("EmailPassword").Value);
                smtp.Send(email);
                smtp.Disconnect(true);
                return true;
            }
            return false;
        }

        public bool UserExists(string id)
        {
            return _userRepository.GetById(id) != null ? true : false;
        }

        public User CheckLogin(string username, string password)
        {
            var user = GetByEmail(username);
            if(user == null) return null;
            if(VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return user;
            }
            return null;
        }

        public bool ForgotPassword(User user, string token)
        {
            if (user == null)
                return false;
            if (token != null)
            {
                user.ResetPassToken = token;
                user.ResetTokenExpires = DateTime.Now.AddHours(1);
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("mapmapzoofpt@gmail.com"));
                email.To.Add(MailboxAddress.Parse(user.Email));
                email.Subject = "Reset Password";
                email.Body = new TextPart(TextFormat.Text) { Text = "This is your token to reset your password:\n " + user.ResetPassToken + "\n\nMapMap Zoo thank you for join with us!!!" };

                using var smtp = new MailKit.Net.Smtp.SmtpClient();
                smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
                smtp.Authenticate(_config.GetSection("EmailUser").Value, _config.GetSection("EmailPassword").Value);
                smtp.Send(email);
                smtp.Disconnect(true);
                return _userRepository.Update(user);
            }
            return false;
        }
        public ICollection<User> GetTrainersCanTrain()
        {
            var userAvailables = _userRepository.GetAll().Where(u => u.CountAnimal < 10 && u.UserId.Contains("ZT") && u.Status == true).ToList();

            return userAvailables;
        }

        public User? GetByEmail(string email)
        {
            var users = _userRepository.GetAll().Where(u => u.Status == true);
            if (email == null)
            {
                return null;
            }
            return users.FirstOrDefault(u => u.Email.Equals(email));
        }

        public User GetById(string id)
        {
            return _userRepository.GetById(id);
        }

        public ICollection<UserDto> GetAllUsers()
        {
            var users = _userRepository.GetAll().Where(u=>u.Status == true).ToList();
            var allUsers = new List<UserDto>();
            if (users != null && users.Count > 0)
            {
                foreach (var user in users)
                {
                    var userDto = _mapper.Map<UserDto>(user);
                    userDto.CountAnimal = _aniTrainerRepository.GetAll().Where(user => user.UserId == userDto.UserId).Count();
                    var exps = _expDetailRepository.GetAll().Where(ex => ex.UserId == user.UserId).ToList();
                    if(exps != null && exps.Count > 0)
                    {
                        foreach (var exp in exps)
                        {
                            var expDetail = _mapper.Map<ExperienceDetailDto>(exp);
                            expDetail.Position = _workExpRepository.GetById(exp.ExperienceId).Position;
                            userDto.Experiences.Add(expDetail);
                        }
                    }
                    allUsers.Add(userDto);
                }
            }
            return allUsers;
        }

        public bool ResetPassword(User user, byte[] passwordHash, byte[] passwordSalt)
        {
            if (user == null) return false;

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.ResetPassToken = null;
            user.ResetTokenExpires = null;
            return Update(user, null);
        }
    
        public bool Update(User user, User? userMap)
        {
            if(userMap != null)
            {
                user.Firstname = userMap.Firstname;
                user.Lastname = userMap.Lastname;
                user.Address = userMap.Address;
                user.Role = user.Role;
                if(user.Phone != userMap.Phone &&
                    GetUserByPhone(userMap.Phone) == null)
                {
                    user.Phone = userMap.Phone;
                }
                user.EndDate = userMap.EndDate;
                if(userMap.EndDate <= DateTime.Now)
                {
                    user.Status = false;
                }
            }
            return _userRepository.Update(user);
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        public int GetTotalUserByRole(Role role)
        {
            return _userRepository.GetAll().Where(x => x.Role == role).Count();
        }

        public User? GetUserByPhone(string phone)
        {
            if(phone == null) return null;
            return _userRepository.GetAll().Where(x => x.Phone == phone).FirstOrDefault();
        }

        public bool DeleteUser(string id)
        {
            var user = _userRepository.GetById(id);
            if (user == null) return false;

            if (user.CountAnimal != 0) return false;

            user.Status = false;
            user.EndDate = DateTime.Now;
            return _userRepository.Update(user);
        }

        public ICollection<UserDto> GetActiveUsers()
        {
            var users = _userRepository.GetAll().Where(u => u.Status == true).ToList();
            var allUsers = new List<UserDto>();
            if (users != null && users.Count > 0)
            {
                foreach (var user in users)
                {
                    var userDto = _mapper.Map<UserDto>(user);
                    var exps = _expDetailRepository.GetAll().Where(ex => ex.UserId == user.UserId).ToList();
                    if (exps != null && exps.Count > 0)
                    {
                        foreach (var exp in exps)
                        {
                            var expDetail = _mapper.Map<ExperienceDetailDto>(exp);
                            expDetail.Position = _workExpRepository.GetById(exp.ExperienceId).Position;
                            userDto.Experiences.Add(expDetail);
                        }
                    }
                    allUsers.Add(userDto);
                }
            }
            return allUsers;
        }

        public ICollection<Animal>? GetAnimalsByUserId(string userId)
        {
            var user = _userRepository.GetById(userId);
            if (user == null) return null;

            if(UserRoleExtensions.ToIntValue(user.Role) == 3)
            {
                var animals = _aniTrainerRepository.GetAll().Where(u => u.UserId == userId).Select(animal => animal.Animal).ToList();
                if (animals == null || animals.Count() == 0) return null;
                return animals;
            }
            return null;
        }

        public AnimalTrainer? GetUserByAnimalId(string animalId)
        {
            return _aniTrainerRepository.GetAll().SingleOrDefault(aniTrainer => aniTrainer.AnimalId == animalId && aniTrainer.EndTrainDate == null);
        }

        public ICollection<User> GetUsers()
        {
            return _userRepository.GetAll();
        }

        public ICollection<UserDto> GetTrainers()
        {
            var users = _userRepository.GetAll().Where(u=> u.Status == true).ToList();
            var allUsers = new List<UserDto>();
            if (users != null && users.Count > 0)
            {
                var trainers = users.Where(trainer => UserRoleExtensions.ToIntValue(trainer.Role) == 3);
                foreach (var user in trainers)
                {
                    var userDto = _mapper.Map<UserDto>(user);
                    var exps = _expDetailRepository.GetAll().Where(ex => ex.UserId == user.UserId).ToList();
                    if (exps != null && exps.Count > 0)
                    {
                        foreach (var exp in exps)
                        {
                            var expDetail = _mapper.Map<ExperienceDetailDto>(exp);
                            expDetail.Position = _workExpRepository.GetById(exp.ExperienceId).Position;
                            userDto.Experiences.Add(expDetail);
                        }
                    }
                    allUsers.Add(userDto);
                }
            }
            return allUsers;
        }

        public ICollection<UserDto> GetStaffs()
        {
            var users = _userRepository.GetAll().Where(u=>u.Status == true).ToList();
            var allUsers = new List<UserDto>();
            if (users != null && users.Count > 0)
            {
                var staffs = users.Where(staff => UserRoleExtensions.ToIntValue(staff.Role) == 2);
                foreach (var user in staffs)
                {
                    var userDto = _mapper.Map<UserDto>(user);
                    var exps = _expDetailRepository.GetAll().Where(ex => ex.UserId == user.UserId).ToList();
                    if (exps != null && exps.Count > 0)
                    {
                        foreach (var exp in exps)
                        {
                            var expDetail = _mapper.Map<ExperienceDetailDto>(exp);
                            expDetail.Position = _workExpRepository.GetById(exp.ExperienceId).Position;
                            userDto.Experiences.Add(expDetail);
                        }
                    }
                    allUsers.Add(userDto);
                }
            }
            return allUsers;
        }

        public UserDto GetUserByEmail(string email)
        {
            var user = _userRepository.GetAll().FirstOrDefault(user => user.Email == email);
            UserDto? userDto = null;
            if(user != null)
            {
                userDto = _mapper.Map<UserDto>(user);
                var exps = _expDetailRepository.GetAll().Where(ex => ex.UserId == user.UserId).ToList();
                if (exps != null && exps.Count > 0)
                {
                    foreach (var exp in exps)
                    {
                        var expDetail = _mapper.Map<ExperienceDetailDto>(exp);
                        userDto.Experiences.Add(expDetail);
                    }
                }
            }
            return userDto;
        }
    }
}
