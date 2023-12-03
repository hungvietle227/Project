using BBL.Interfaces;
using DAL.Entities;
using DAL.Repositories;
using DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Services
{
    public class AnimalSpeciesService : IAnimalSpeciesService
    {
        private readonly IGenericRepository<AnimalSpecies> _speciesRepo;
        private readonly IGenericRepository<Animal> _animalRepo;
        public AnimalSpeciesService(IGenericRepository<AnimalSpecies> speciesRepo, IGenericRepository<Animal> animalRepo)
        {
            _speciesRepo = speciesRepo;
            _animalRepo = animalRepo;
        }
        public bool AddAnimalSpecies(AnimalSpecies animalSpecies)
        {
            return _speciesRepo.Add(animalSpecies);
        }

        public ICollection<AnimalSpecies> GetAll()
        {
            return _speciesRepo.GetAll();
        }


        public AnimalSpecies GetBySpeciesId(string id)
        {
            return _speciesRepo.GetById(id);
        }

        public AnimalSpecies GetBySpeciesName(string name)
        {
            return _speciesRepo.GetAll().Where(species => species.SpeciesName == name).FirstOrDefault();
        }

        public ICollection<GetSpeciesDto> GetSpeciesAnimal()
        {
            var animalSpecies = _speciesRepo.GetAll().ToList();
            var allSpecies = new List<GetSpeciesDto>();
            foreach(var animal in animalSpecies)
            {
                var species = new GetSpeciesDto();
                species.SpeciesId = animal.SpeciesId;
                species.SpeciesName = animal.SpeciesName;
                species.CountAnimal = _animalRepo.GetAll().Where(a => a.SpeciesId == species.SpeciesId && a.Status == true).Count();
                allSpecies.Add(species);
            }
            return allSpecies;
        }

        public bool SpeciesExists(string id)
        {
            return _speciesRepo.GetById(id) != null ? true : false;
        }
    }
}
