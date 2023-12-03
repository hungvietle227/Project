namespace DTO.Dtos
{
    public class AnimalScheduleDto
    {
        public string AnimalId { get; set; }
        public List<AnimalScheduleCreateDto> AnimalSchedules { get; set; }
    }
}
