namespace DTO.Dtos
{
    public class FoodAmountDto
    {
        public string FoodId { get; set; }
        public string FName { get; set; }
        public DateTime StartEat { get; set; }
        public DateTime EndEat { get; set; }
        public double Amount { get; set; }
        public string CategoryName { get; set; }
    }
}
