using AutoMapper;
using BBL.Interfaces;
using BBL.Services;
using BLL.Interfaces;
using DAL.Entities;
using DAL.Repositories;
using DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class MealService : IMealService
    {
        private readonly IGenericRepository<Meal> _mealRepo;
        private readonly IGenericRepository<Food> _foodRepo;
        private readonly IGenericRepository<FoodMeal> _foodMealRepo;
        private readonly IGenericRepository<AnimalMeal> _animalMealRepo;
        private readonly IMapper _mapper;
        public MealService(IGenericRepository<Meal> mealRepo, IGenericRepository<Food> foodRepo, IGenericRepository<FoodMeal> foodMealRepo, IMapper mapper, IGenericRepository<AnimalMeal> animalMealRepo)
        {
            _mealRepo = mealRepo;
            _foodRepo = foodRepo;
            _animalMealRepo = animalMealRepo;
            _foodMealRepo = foodMealRepo;
            _mapper = mapper;
        }
        public bool AddMeal(List<FoodMealDto> foodMeals, Meal meal)
        {
            try
            {
                if (_mealRepo.Add(meal))
                {
                    var newMeal = _mealRepo.GetById(meal.MealId);
                    if(newMeal != null)
                    {
                        newMeal.FoodMeals = new List<FoodMeal>();
                        foreach (var fMeal in foodMeals)
                        {
                            var food = _foodRepo.GetById(fMeal.FoodId);
                            if(food == null) return false;
                            newMeal.FoodMeals.Add(new FoodMeal
                            {
                                MealId = newMeal.MealId,
                                FoodId = food.FoodId,
                                Quantity = fMeal.Quantity,
                                Unit = fMeal.Unit
                            });
                        }
                        _mealRepo.Update(newMeal);
                        return true;
                    }
                    return false;
                }

                return false;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public int CountMeal()
        {
            return _mealRepo.GetAll().ToList().Count();
        }

        public bool DeleteMeal(string mealId)
        {
            var meal = _mealRepo.GetById(mealId);
            return _mealRepo.Delete(meal);
        }

        public ICollection<AnimalMeal> GetAllMealsByAnimalId(string animalId)
        {
            return _animalMealRepo.GetAll().Where(am => am.AnimalId == animalId).ToList();
        }

        public AnimalMeal? GetMealByAnimalId(string animalId)
        {
            return _animalMealRepo.GetAll().SingleOrDefault(am => am.AnimalId == animalId && ((am.EndEat == null && am.StartEat < DateTime.Now) || (am.EndEat > DateTime.Now && am.StartEat < DateTime.Now)));
        }

        public Meal GetMealById(string mealId)
        {
            return _mealRepo.GetById(mealId);
        }

        public ICollection<MealDto> GetMeals()
        {
            var meals = _mealRepo.GetAll().ToList();
            var allMeals = new List<MealDto>();
            if (meals != null && meals.Count > 0)
            {
                foreach (var meal in meals)
                {
                    var mealDto = _mapper.Map<MealDto>(meal);
                    var foodMeal = _foodMealRepo.GetAll().Where(ex => ex.MealId == meal.MealId).ToList();
                    if (foodMeal != null && foodMeal.Count > 0)
                    {
                        foreach (var fmeal in foodMeal)
                        {
                            var foods = GetFoodsByMealId(fmeal.MealId);

                            var foodMealDetail = _mapper.Map<GetFoodMealDto>(fmeal);
                            foreach (var food in foods)
                            {
                                foodMealDetail.FName = _foodRepo.GetById(foodMealDetail.FoodId).FName;
                            }
                            mealDto.FoodMealDtos.Add(foodMealDetail);
                        }
                    }
                    allMeals.Add(mealDto);
                }
            }
            return allMeals;
        }

        public ICollection<FoodMeal> GetFoodsByMealId(string mealId)
        {
            return _foodMealRepo.GetAll().Where(fm => fm.MealId == mealId).ToList();
        }
        public ICollection<AnimalMeal> GetMealsByAnimalId(string animalId)
        {
            return _animalMealRepo.GetAll().Where(a => a.AnimalId == animalId).ToList();
        }

        public bool UpdateMeal(Meal meal, List<FoodMealUpdateDto> foodMeals)
        {
            if (meal.FoodMeals == null)
                meal.FoodMeals = new List<FoodMeal>();
            try
            {
                var meals = _foodMealRepo.GetAll().Where(m => m.MealId == meal.MealId).ToList();
                foreach(var m in meals)
                {
                    _foodMealRepo.Delete(m);
                }
                meal.FoodMeals.Clear();
                foreach (var fMeal in foodMeals)
                {
                    var food = _foodRepo.GetById(fMeal.FoodId);
                    if (food == null) return false;
                    meal.FoodMeals.Add(new FoodMeal
                    {
                        MealId = meal.MealId,
                        FoodId = food.FoodId,
                        Quantity = fMeal.Quantity,
                        Unit = fMeal.Unit
                    });
                }
                return _mealRepo.Update(meal);
            } catch (Exception ex)
            {
                return false;
            }

        }

        public ICollection<GetMealAnimalDto> GetOldMeal(string animalId)
        {
            var animalMeals = _animalMealRepo.GetAll().Where(am => am.AnimalId == animalId && am.EndEat < DateTime.Now).ToList();
            var meals = new List<GetMealAnimalDto>();
            if (animalMeals != null)
            {
                foreach (var animalMeal in animalMeals)
                {
                    var fMeal = _mapper.Map<List<GetFoodMealDto>>(GetFoodsByMealId(animalMeal.MealId));
                    var foodMeal = GetFoodsByMealId(animalMeal.MealId);
                    foreach (var f in fMeal)
                    {
                        foreach (var food in foodMeal)
                        {
                            f.FName = _foodRepo.GetById(food.FoodId).FName;
                        }
                    }
                    var meal = new GetMealAnimalDto();
                    meal.MealId = animalMeal.MealId;
                    meal.MealName = GetMealById(animalMeal.MealId).MealName;
                    meal.StartEat = animalMeal.StartEat;
                    meal.EndEat = animalMeal.EndEat;
                    meal.FoodMealDtos = fMeal;
                    meals.Add(meal);
                }
            }
            return meals;
        }
    }
}
