using DAL.Entities;
using DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Interfaces
{
    public interface IAnimalService
    {
        bool AddAnimal(string? userId, string? cageId, Animal animal);
        bool UpdateAnimal(Animal animal, Animal? animalMap);
        bool AddAnimalTrainer(string userId, string animalId, AnimalTrainer animalTrainer);
        bool AddAnimalCage(string cageId, string animalId, AnimalCage animalCage);
        ICollection<GetAnimalDto>? GetAllActive();
        ICollection<GetAnimalDto>? GetAll();
        Animal? GetByAnimalId(string id);
        GetAnimalDto? GetById(string id);
        bool AnimalExists(string id);
        bool DeleteAnimal(string id);

        ICollection<OldUsersDto>? GetOldTrainersOfAnimal(string animalId);
        ICollection<OldCagesDto>? GetOldCagesOfAnimal(string animalId);
        ICollection<AnimalCage> GetAnimalCageByAnimalId(string animalId);
        ICollection<AnimalCage> GetAnimalCages();
        ICollection<AnimalTrainer> GetAnimalTrainers();
        ICollection<Animal> GetAnimalByTrainerId(string trainerId);
        ICollection<GetSpeciesAnimalDto> GetAnimalBySpecies(string speciesId);
        ICollection<Animal> GetAnimalBySpeciesId(string speciesId);
        ICollection<OldFoodDto> GetOldFoodOfAnimal(string animalId);
        ICollection<GetAnimalAllMealDto> GetAllAnimalWithMeals();
    }
}
