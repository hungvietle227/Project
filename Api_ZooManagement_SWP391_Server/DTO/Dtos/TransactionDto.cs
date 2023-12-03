namespace DTO.Dtos
{
    public class TransactionDto
    {
        public string TransactionId { get; set; }
        public string PaymentMethod { get; set; }
        public string TransactionInfo { get; set; }
        public DateTime TransactionDate { get; set; }
        public bool Status { get; set; }
    }
}
