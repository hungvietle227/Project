namespace DTO.Dtos
{
    public class OrderDto
    {
        public string OrderId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public double TotalPrice { get; set; }
        public string TransactionId { get; set; } = string.Empty;
    }
}
