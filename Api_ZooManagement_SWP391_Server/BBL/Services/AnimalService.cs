using BBL.Interfaces;
using DAL.Data;
using DAL.Entities;
using DAL.Repositories;
using DTO.Dtos;

namespace BBL.Services
{
    public class AnimalService : IAnimalService
    {
        private readonly IGenericRepository<Animal> _animalRepo;
        private readonly IGenericRepository<User> _userRepo;
        private readonly IGenericRepository<Cage> _cageRepo;
        private readonly IGenericRepository<Food> _foodRepo;
        private readonly IGenericRepository<AnimalTrainer> _animalTrainerRepo;
        private readonly IGenericRepository<AnimalCage> _animalCageRepo;
        private readonly IGenericRepository<AnimalSpecies> _animalSpeRepo;
        private readonly IGenericRepository<AnimalMeal> _animalMealRepo;
        private readonly IGenericRepository<AnimalSchedule> _animalScheduleRepo;

        public AnimalService(IGenericRepository<Animal> animalRepo,
                             IGenericRepository<User> userRepo,
                             IGenericRepository<Cage> cageRepo, 
                             IGenericRepository<AnimalCage> animalCageRepo,
                             IGenericRepository<AnimalTrainer> animalTrainerRepo, 
                             IGenericRepository<AnimalSpecies> animalSpeRepo,
                             IGenericRepository<Food> foodRepo,
                             IGenericRepository<AnimalMeal> animalMealRepo,
                             IGenericRepository<AnimalSchedule> animalScheRepo)
        {
            _animalRepo = animalRepo;
            _cageRepo = cageRepo;
            _userRepo = userRepo;
            _animalCageRepo = animalCageRepo;
            _animalTrainerRepo = animalTrainerRepo;
            _animalSpeRepo = animalSpeRepo;
            _foodRepo = foodRepo;
            _animalMealRepo = animalMealRepo;
            _animalScheduleRepo = animalScheRepo;
        }
        public bool AddAnimal(string? userId, string? cageId, Animal animal)
        {
            if (_animalRepo.Add(animal))
            {
                var trainer = _userRepo.GetById(userId);
                var cage = _cageRepo.GetById(cageId);
                AnimalTrainer newAnimalTrainer = new AnimalTrainer
                {
                    User = trainer,
                    Animal = animal,
                    StartTrainDate = DateTime.Now,
                };
                _animalTrainerRepo.Add(newAnimalTrainer);
                AnimalCage newAnimalCage = new AnimalCage
                {
                    Cage = cage,
                    Animal = animal,
                    EntryCageDate = DateTime.Now,
                };
                cage.AnimalQuantity += 1;
                trainer.CountAnimal += 1;
                _animalCageRepo.Add(newAnimalCage);
                return true;
            }
            return false;
        }

        public bool AnimalExists(string id)
        {
            return _animalRepo.GetById(id) != null ? true : false;
        }

        public ICollection<GetAnimalDto> GetAllActive()
        {
            var animals = _animalRepo.GetAll().Where(a=>a.Status == true).ToList();
            var allAnimals = new List<GetAnimalDto>();
            if (animals != null && animals.Count > 0)
            {
                foreach (var animal in animals)
                {
                    var a = new GetAnimalDto();
                    a.AnimalId = animal.AnimalId;
                    a.AnimalImage = animal.AnimalImage;
                    a.Birthday = animal.Birthday;
                    a.Description = animal.Description;
                    a.Name = animal.Name;
                    a.Rarity = animal.Rarity;
                    a.Region = animal.Region;
                    a.Sex = animal.Sex;
                    a.HealthCheck = animal.HealthCheck;
                    a.SpeciesName = _animalSpeRepo.GetById(animal.SpeciesId).SpeciesName;
                    a.Status = animal.Status;

                    allAnimals.Add(a);
                }
            }
            return allAnimals;
        }
        public ICollection<GetAnimalAllMealDto> GetAllAnimalWithMeals()
        {
            var animals = _animalRepo.GetAll().Where(a=>a.Status == true).ToList();
            var allAnimals = new List<GetAnimalAllMealDto>();
            if (animals != null && animals.Count > 0)
            {
                foreach (var animal in animals)
                {
                    var a = new GetAnimalAllMealDto();
                    a.AnimalId = animal.AnimalId;
                    a.AnimalImage = animal.AnimalImage;
                    a.Birthday = animal.Birthday;
                    a.Description = animal.Description;
                    a.Name = animal.Name;
                    a.Rarity = animal.Rarity;
                    a.Region = animal.Region;
                    a.Sex = animal.Sex;
                    a.HealthCheck = animal.HealthCheck;
                    a.SpeciesName = _animalSpeRepo.GetById(animal.SpeciesId).SpeciesName;
                    a.Status = animal.Status;

                    allAnimals.Add(a);
                }
            }
            return allAnimals;
        }
        public ICollection<GetAnimalDto> GetAll()
        {
            var animals = _animalRepo.GetAll().ToList();
            var allAnimals = new List<GetAnimalDto>();
            if (animals != null && animals.Count > 0)
            {
                foreach (var animal in animals)
                {
                    var a = new GetAnimalDto();
                    a.AnimalId = animal.AnimalId;
                    a.AnimalImage = animal.AnimalImage;
                    a.Birthday = animal.Birthday;
                    a.Description = animal.Description;
                    a.Name = animal.Name;
                    a.Rarity = animal.Rarity;
                    a.Region = animal.Region;
                    a.Sex = animal.Sex;
                    a.HealthCheck = animal.HealthCheck;
                    a.SpeciesName = _animalSpeRepo.GetById(animal.SpeciesId).SpeciesName;
                    a.Status = animal.Status;

                    allAnimals.Add(a);
                }
            }
            return allAnimals;
        }
        public Animal? GetByAnimalId(string id)
        {
            return _animalRepo.GetById(id);
        }

        public ICollection<AnimalTrainer> GetAnimalTrainers()
        {
            return _animalTrainerRepo.GetAll();
        }

        public ICollection<AnimalCage> GetAnimalCages()
        {
            return _animalCageRepo.GetAll();
        }

        public ICollection<AnimalCage>? GetAnimalCageByAnimalId(string animalId)
        {
            var animalCages = _animalCageRepo.GetAll().Where(a => a.AnimalId == animalId).ToList();
            
            return animalCages;
        }

        public bool UpdateAnimal(Animal animal, Animal? animalMap)
        {
            if (animalMap != null)
            {
                animal.Description = animalMap.Description;
                animal.HealthCheck = animalMap.HealthCheck;
                animal.Status = animalMap.Status;
                animal.Rarity = animalMap.Rarity;
                //animal.AnimalFoods = animalMap.AnimalFoods;
                animal.AnimalMeals = animalMap.AnimalMeals;
                animal.AnimalSchedules = animalMap.AnimalSchedules;
            }
            return _animalRepo.Update(animal);
        }
        public bool AddAnimalTrainer(string userId, string animalId, AnimalTrainer animalTrainer)
        {
            if (animalTrainer.UserId != null)
            {
                var trainer = _userRepo.GetById(userId);
                var animal = _animalRepo.GetById(animalId);
                AnimalTrainer newAnimalTrainer = new AnimalTrainer
                {
                    User = trainer,
                    Animal = animal,
                    StartTrainDate = DateTime.Now,
                };
                return _animalTrainerRepo.Add(newAnimalTrainer);
            }
            return false;
        }

        public bool AddAnimalCage(string cageId, string animalId, AnimalCage animalCage)
        {
            if (animalCage.CageId != null)
            {
                var cage = _cageRepo.GetById(cageId);
                var animal = _animalRepo.GetById(animalId);
                AnimalCage newAnimalCage = new AnimalCage
                {
                    Cage = cage,
                    Animal = animal,
                    EntryCageDate = DateTime.Now,
                };
                var cageQuan = _cageRepo.GetById(cageId).AnimalQuantity;
                cageQuan += 1;
                return _animalCageRepo.Add(newAnimalCage);
            }
            return false;
        }
        public bool DeleteAnimal(string animalId)
        {
            var animal = _animalRepo.GetById(animalId);
            if (animal == null)
                return false;
            var animalCage = _animalCageRepo.GetAll().Where(a => a.AnimalId == animalId && a.OutCageDate == null).FirstOrDefault();
            animalCage.OutCageDate = DateTime.Now;

            var animalTrainer = _animalTrainerRepo.GetAll().Where(a => a.AnimalId == animalId && a.EndTrainDate == null).FirstOrDefault();
            animalTrainer.EndTrainDate = DateTime.Now;

            var cage = _cageRepo.GetById(animalCage.CageId);
            cage.AnimalQuantity -= 1;

            var train = _userRepo.GetById(animalTrainer.UserId);
            train.CountAnimal -= 1;

            var animalMeals = _animalMealRepo.GetAll().Where(a => a.AnimalId == animalId && a.StartEat > DateTime.Now).ToList();
            foreach (var animalMeal in animalMeals)
            {
                _animalMealRepo.Delete(animalMeal);
            }

            var mealAnimals = _animalMealRepo.GetAll().Where(_a => _a.AnimalId == animalId && (_a.EndEat > DateTime.Now && _a.StartEat < DateTime.Now)).ToList();
            foreach(var  animalMeal in mealAnimals)
            {
                animalMeal.EndEat = DateTime.Now;
                _animalMealRepo.Update(animalMeal);
            }

            var animalSchedule = _animalScheduleRepo.GetAll().Where(ac => ac.AnimalId == animalId).ToList();
            foreach(var aniSche in animalSchedule)
            {
                _animalScheduleRepo.Delete(aniSche);
            }
            animal.Status = false;
            return _animalRepo.Update(animal);
        }

        public ICollection<Animal> GetAnimalByTrainerId(string trainerId)
        {
            var animalTrainers = _animalTrainerRepo.GetAll().Where(at => at.UserId == trainerId).ToList();
            var animals = new List<Animal>();
            if (animalTrainers != null)
            {
                foreach (var animalTrainer in animalTrainers)
                {
                    animals.Add(_animalRepo.GetById(animalTrainer.AnimalId));
                }
            }
            return animals;
        } 

        public ICollection<OldUsersDto>? GetOldTrainersOfAnimal(string animalId)
        {
            var aniTrainers = _animalTrainerRepo.GetAll().Where(a => a.AnimalId == animalId && a.EndTrainDate != null).ToList();
            var trainers = new List<OldUsersDto>();
            if (aniTrainers != null)
            {
                foreach (var aniTrainer in aniTrainers)
                {
                    var t = new OldUsersDto();
                    t.UserId = aniTrainer.UserId;
                    t.UserName = _userRepo.GetById(aniTrainer.UserId).Firstname + _userRepo.GetById(aniTrainer.UserId).Lastname;
                    t.StartTrainDate = aniTrainer.StartTrainDate;
                    t.EndTrainDate = aniTrainer.EndTrainDate;
                    trainers.Add(t);
                }
            }
            return trainers;
        }

        public ICollection<OldCagesDto>? GetOldCagesOfAnimal(string animalId)
        {
            var aniCages = _animalCageRepo.GetAll().Where(aniCage => aniCage.AnimalId == animalId && aniCage.OutCageDate != null).ToList();
            var cages = new List<OldCagesDto>();
            if (aniCages != null)
            {
                foreach(var aniCage in aniCages)
                {
                    var c = new OldCagesDto();
                    c.CId = aniCage.CageId;
                    c.Name = _cageRepo.GetById(aniCage.CageId).Name;
                    c.EntryCageDate = aniCage.EntryCageDate;
                    c.OutCageDate = aniCage.OutCageDate;
                    
                    cages.Add(c);
                }
            }
            return cages;
        }

        public GetAnimalDto? GetById(string id)
        {
            var animal = _animalRepo.GetById(id);
            if(animal != null)
            {
                var animalDto = new GetAnimalDto();
                animalDto.AnimalId = animal.AnimalId;
                animalDto.AnimalImage = animal.AnimalImage;
                animalDto.Birthday = animal.Birthday;
                animalDto.Description = animal.Description;
                animalDto.Name = animal.Name;
                animalDto.Rarity = animal.Rarity;
                animalDto.Region = animal.Region;
                animalDto.Sex = animal.Sex;
                animalDto.HealthCheck = animal.HealthCheck;
                animalDto.Status = animal.Status;
                return animalDto;
            }

            return null;
        }

        public ICollection<Animal> GetAnimalBySpeciesId(string speciesId)
        {
            var animal = _animalRepo.GetAll().Where(a => a.SpeciesId == speciesId).ToList();
            return animal;
        }
        public ICollection<GetSpeciesAnimalDto> GetAnimalBySpecies(string speciesId)
        {
            var animalSpes = _animalSpeRepo.GetAll().Where(asp => asp.SpeciesId == speciesId).ToList() ;
            var allAnimalsSpe = new List<GetSpeciesAnimalDto>();
            if (animalSpes != null && animalSpes.Count > 0)
            {
                foreach (var animalSpe in animalSpes)
                {
                    var asp = new GetSpeciesAnimalDto();
                    asp.SpeciesId = animalSpe.SpeciesId;
                    asp.SpeciesName = animalSpe.SpeciesName;
                    allAnimalsSpe.Add(asp);
                }
                foreach (var animalSpe in allAnimalsSpe)
                {
                    animalSpe.Animals = new List<GetAnimalDto>();
                    var animals = GetAnimalBySpeciesId(animalSpe.SpeciesId);
                    foreach (var animal in animals)
                    {
                        animalSpe.Animals.Add(new GetAnimalDto
                        {
                            AnimalId = animal.AnimalId,
                            AnimalImage = animal.AnimalImage,
                            Birthday = animal.Birthday,
                            Description = animal.Description,
                            Name = animal.Name,
                            Rarity = animal.Rarity,
                            Region = animal.Region,
                            Sex = animal.Sex,
                            HealthCheck = animal.HealthCheck,
                            Status = animal.Status,
                        });
                    }
                }
            }
            return allAnimalsSpe;
        }

        public ICollection<OldFoodDto> GetOldFoodOfAnimal(string animalId)
        {
            //var aniFoods = _animalFoodRepo.GetAll().Where(af => af.AnimalId == animalId && af.EndEat < DateTime.Now).ToList();
            var oldFoods = new List<OldFoodDto>();

            /*foreach(var aniFood in aniFoods)
            {
                var oldFood = new OldFoodDto();
                oldFood.FName = _foodRepo.GetById(aniFood.FoodId).FName;
                oldFood.Amount = aniFood.Amount;
                oldFood.StartEat = aniFood.StartEat;
                oldFood.EndEat = aniFood.EndEat;

                oldFoods.Add(oldFood);
            }*/

            return oldFoods;
        }
    }
}
