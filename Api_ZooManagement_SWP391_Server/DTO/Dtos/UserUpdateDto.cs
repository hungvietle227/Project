namespace DTO.Dtos
{
    public class UserUpdateDto
    {
        public string UserId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public Role Role { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
