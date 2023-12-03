
using DAL.Entities;
using DTO.Dtos;

namespace BBL.Interfaces
{
    public interface IUserService
    {
        bool Add(List<ExperienceUserDto> experiences, User user);
        bool Update(User user, User? userMap);
        bool UserExists(string id);
        bool DeleteUser(string id);
        ICollection<UserDto> GetAllUsers();
        ICollection<User> GetUsers();
        ICollection<UserDto> GetTrainers();
        ICollection<UserDto> GetStaffs();
        ICollection<UserDto> GetActiveUsers();
        UserDto GetUserByEmail(string email);
        ICollection<Animal> GetAnimalsByUserId(string userId);
        User GetById(string id);
        ICollection<User> GetTrainersCanTrain();
        int GetTotalUserByRole(Role role);
        User GetUserByPhone(string phone);
        AnimalTrainer GetUserByAnimalId(string animalId);
        public User CheckLogin(string username, string password);
        public User GetByEmail(string email);
        public bool ForgotPassword(User user, string token);
        public bool ResetPassword(User user, byte[] passwordHash, byte[] passwordSalt);
    }
}
