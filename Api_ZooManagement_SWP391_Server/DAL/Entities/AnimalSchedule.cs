namespace DAL.Entities
{
    public class AnimalSchedule
    {
        public string AnimalId { get; set; }
        public string ScheduleId { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; }
        public Animal Animal { get; set; }
        public Schedule Schedule { get; set; }
    }
}
