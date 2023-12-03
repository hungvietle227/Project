namespace DTO.Dtos
{
    public class GetAnimalDto
    {
        public string AnimalId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string MealName { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool Sex { get; set; }
        public string Region { get; set; } = string.Empty;
        public string HealthCheck { get; set; } = string.Empty;
        public DateTime Birthday { get; set; }
        public bool Rarity { get; set; }
        public string? CId { get; set; }
        public DateTime? EntryCageDate { get; set; }
        public DateTime? OutCageDate { get; set; }
        public string? UserId { get; set; }
        public DateTime? StartTrainDate { get; set; }
        public DateTime? EndTrainDate { get; set; }
        public string MealId { get; set; }
        public DateTime StartEat { get; set; }
        public DateTime? EndEat { get; set; }
        public string? AnimalImage { get; set; }
        public string SpeciesName { get; set; }
        public bool Status { get; set; }
        public List<GetAnimalScheduleDto> Schedules { get; set; }
        public List<GetFoodMealDto> FoodMealDtos { get; set; } = new List<GetFoodMealDto>();
    }
}
