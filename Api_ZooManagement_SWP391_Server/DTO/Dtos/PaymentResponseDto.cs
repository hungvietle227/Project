namespace DTO.Dtos
{
    public class PaymentResponseDto
    {
        public string TransactionInfo { get; set; }
        public string TransactionId { get; set; }
        public string PaymentMethod { get; set; }
        public string Success { get; set; }
        public string Token { get; set; }
        public string VnPayResponseCode { get; set; }
        public OrderCreateDto OrderCreate { get; set; }
    }
}
