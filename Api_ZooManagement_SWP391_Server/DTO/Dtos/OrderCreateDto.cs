namespace DTO.Dtos
{
    public class OrderCreateDto
    {
        public string Email { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime StartDate { get; set; }
        public double TotalPrice { get; set; }
        public List<TicketDto>? Tickets { get; set; }
    }
}
