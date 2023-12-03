namespace DTO.Dtos
{
    public class UserCreateDto
    {
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public bool Sex { get; set; }
        public Role Role { get; set; }
        public string UserImage { get; set; }
        public List<ExperienceUserDto> Experiences { get; set; }
    }
}
