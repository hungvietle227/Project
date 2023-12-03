namespace DTO.Dtos
{
    public class UserDto
    {
        public string UserId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Firstname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public bool Sex { get; set; }
        public Role Role { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Status { get; set; }
        public string UserImage { get; set; }
        public int CountAnimal { get; set; }
        public List<ExperienceDetailDto> Experiences { get; set; } = new List<ExperienceDetailDto>();
    }
}
