using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class AnimalCage
    {
        public string AnimalId { get; set; }

        public string CageId { get; set;}

        public DateTime EntryCageDate { get; set; }

        public DateTime? OutCageDate { get; set; }

        public Animal Animal { get; set; }
        public Cage Cage { get; set; }
    }
}
