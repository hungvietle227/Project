using System.ComponentModel.DataAnnotations;
using DTO.Dtos;

namespace DAL.Entities
{
    public class User
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; } = new byte[32];
        public byte[] PasswordSalt { get; set; } = new byte[32];
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
        public int CountAnimal {  get; set; }
        public string? UserImage {  get; set; } 
        public ICollection<ExperienceDetail> ExperienceDetails { get; set; }  
        public ICollection<AnimalTrainer> AnimalTrainers { get; set; }
        public ICollection<News> News { get; set; }

    }
}
