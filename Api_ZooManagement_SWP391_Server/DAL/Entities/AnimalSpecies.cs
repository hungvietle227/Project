using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class AnimalSpecies
    {
        public string SpeciesId { get; set; }
        public string SpeciesName { get; set; }
        public ICollection<Animal> Animals { get; set; }
    }
}
