using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class WorkExperience
    {
        public string ExperienceId { get; set; }
        public string Position { get; set; }
        public ICollection<ExperienceDetail> ExperienceDetails { get; set; }
    }
}
