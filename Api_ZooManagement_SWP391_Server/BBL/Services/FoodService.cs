using BBL.Interfaces;
using DAL.Data;
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
    public class FoodService : IFoodService

    {
        private readonly IGenericRepository<Food> _foodRepository;
        private readonly IGenericRepository<FoodCategory> _foodCategoryRepository;
        private readonly IGenericRepository<FoodMeal> _foodMealRepository;
        private readonly IGenericRepository<AnimalMeal> _animalMealRepository;
        private readonly DataContext _context;

        public FoodService(IGenericRepository<Food> foodRepository,
             DataContext context, IGenericRepository<FoodCategory> foodCategoryRepository, IGenericRepository<FoodMeal> foodMealRepository, IGenericRepository<AnimalMeal> animalMealRepository)
        {
            _foodRepository = foodRepository;
            _context = context;
            _foodCategoryRepository = foodCategoryRepository;
            _foodMealRepository = foodMealRepository;
            _animalMealRepository = animalMealRepository;
        }

        public bool AddFood(Food food)
        {
            return _foodRepository.Add(food);
        }

        public bool DeleteFood(string foodId)
        {
            var food = _foodRepository.GetById(foodId);
            if (food == null) return false;
            _context.Remove(food);
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool FoodExists(string id)
        {
            return _foodRepository.GetById(id) != null ? true : false;
        }

        public ICollection<FoodDto> GetAllFood()
        {
            var getFoods = _foodRepository.GetAll().ToList();
            var allFoods = new List<FoodDto>();
            foreach (var getFood in getFoods)
            {
                var f = new FoodDto();
                f.FoodId = getFood.FoodId;
                f.FName = getFood.FName;
                f.Quantity = getFood.Quantity;
                f.Unit = getFood.Unit;
                f.ImportDate = getFood.ImportDate;
                f.ExpiredDate = getFood.ExpiredDate;
                var food = _foodCategoryRepository.GetById(getFood.CategoryId);
                f.CategoryName = food.CategoryName;
                    
                allFoods.Add(f);
            }
            return allFoods;
        }

        public List<Animal> GetAnimalsByFoodId(string foodId)
        {
            List<Animal> animals = null;
            if (animals == null || animals.Count() == 0) return null;
            return animals;
        }

        public Food GetByFoodId(string id)
        {
            return _foodRepository.GetById(id);
        }

        public Food? GetByFoodName(string name)
        {
            var Foods = _foodRepository.GetAll();
            foreach (Food food in Foods)
            {
                if (food.FName == name)
                {
                    return food;
                }
            }
            return null;
        }

        public bool UpdateFood(Food foodMap)
        {
            var food = _foodRepository.GetById(foodMap.FoodId);
            if (food == null) return false;
            food.FName = foodMap.FName;
            food.Unit = foodMap.Unit;
            food.ImportDate = foodMap.ImportDate;
            food.ExpiredDate = foodMap.ExpiredDate;
            food.Quantity = foodMap.Quantity;          
            return _foodRepository.Update(food);
        }

        public ICollection<FoodMeal> GetFoodsByMealId(string mealId)
        {
            return _foodMealRepository.GetAll().Where(fm => fm.MealId == mealId).ToList();
        }

        public ICollection<AnimalMeal> GetMealsByAnimalId(string animalId)
        {
            return _animalMealRepository.GetAll().Where(am => am.AnimalId == animalId).ToList();
        }
       
        public bool UpdateFoodFeed(string animalId)
        {
            var animalMeal = GetMealsByAnimalId(animalId);
            

            if (animalMeal != null && animalMeal.Count > 0) {

                foreach (var aMeal in animalMeal)
                {
                    var foodMeal = GetFoodsByMealId(aMeal.MealId).ToList();
                    foreach (var fMeal in foodMeal)
                    {
                        var food = _foodRepository.GetById(fMeal.FoodId);
                        if (food.Quantity > fMeal.Quantity && aMeal.StartEat < DateTime.Now && aMeal.EndEat > DateTime.Now)
                        {
                            food.Quantity -= fMeal.Quantity;
                        }
                        _foodRepository.Update(food);
                    }
                }
            }
            return false;
        }
    }
}
