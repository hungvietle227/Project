namespace DAL.Entities
{
    public class ExperienceDetail
    {
        public string UserId { get; set; }
        public string ExperienceId { get; set; }
        public string Company { get; set; }
        public User User { get; set; }
        public WorkExperience WorkExperience { get; set; }

    }
}
