using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class Schedule
    {
        public string ScheduleId { get; set; }
        public string ScheduleName { get; set; }
        public bool Status { get; set; }
        public ICollection<AnimalSchedule> AnimalSchedules { get; set; }
    }
}
