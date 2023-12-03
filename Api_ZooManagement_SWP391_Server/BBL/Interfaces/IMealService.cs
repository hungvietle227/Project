using DAL.Entities;
using DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IMealService
    {
        Meal GetMealById(string mealId);
        ICollection<MealDto> GetMeals();
        bool AddMeal(List<FoodMealDto> foodMeals, Meal meal);
        bool UpdateMeal(Meal meal, List<FoodMealUpdateDto> foodMeals);
        bool DeleteMeal(string mealId);
        int CountMeal();
        AnimalMeal? GetMealByAnimalId(string animalId);
        ICollection<AnimalMeal> GetMealsByAnimalId(string animalId);
        ICollection<AnimalMeal> GetAllMealsByAnimalId(string animalId);
        ICollection<FoodMeal> GetFoodsByMealId(string mealId);
        ICollection<GetMealAnimalDto> GetOldMeal(string animalId);
    }
}
