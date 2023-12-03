namespace DTO.Dtos
{
    public class AnimalResponseDto
    {
        public List<GetAnimalAllMealDto> Animals { get; set; } = new List<GetAnimalAllMealDto>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
