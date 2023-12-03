namespace DTO.Dtos
{
    public class UpdateAnimalDto
    {
        public string AnimalId { get; set; }
        public string UserId { get; set; }
        public string CageId { get; set; }
        public string Description { get; set; }
        public string HealthCheck { get; set; }
        public bool Status { get; set; }
        public bool Rarity { get; set; }
        public DateTime? EndTrainDate { get; set; }
        public DateTime? OutCageDate { get; set; }
        public List<UpdateAnimalMealDto> AnimalMeals { get; set; }
        public List<UpdateAnimalScheduleDto> AnimalSchedules { get; set; }
    }
}
