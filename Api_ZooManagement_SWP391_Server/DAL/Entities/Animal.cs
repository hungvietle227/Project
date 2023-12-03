using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class Animal
    {
        public string AnimalId { get; set; }
        public string Name {  get; set; }
        public string Description { get; set; }
        public bool Sex { get; set; }
        public string Region { get; set; }
        public string HealthCheck { get; set; }
        public DateTime Birthday { get; set; }
        public bool Status { get; set; }
        public bool Rarity { get; set; }
        public string? AnimalImage {  get; set; }
        public AnimalSpecies Species { get; set; }
        public string SpeciesId { get; set; }
        public ICollection<AnimalCage> AnimalCages { get; set; }
        public ICollection<AnimalTrainer> AnimalTrainers { get; set; }
        public ICollection<AnimalSchedule> AnimalSchedules { get; set; }
        public ICollection<AnimalMeal> AnimalMeals { get; set; }
    }
}
