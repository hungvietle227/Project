using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class Area
    {
        public string AreaId { get; set; }
        public string AreaName { get; set; }
        public string Description { get; set; }

        public ICollection<Cage> Cages { get; set; }
    }
}
    