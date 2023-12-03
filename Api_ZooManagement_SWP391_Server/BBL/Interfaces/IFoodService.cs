using DAL.Entities;
using DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Interfaces
{
    public interface IFoodService
    {
        bool AddFood(Food food);
        bool UpdateFood(Food foodMap);
        bool DeleteFood(string foodId);
        List<Animal> GetAnimalsByFoodId(string foodId);
        //ICollection<AnimalFood> GetFoodsByAnimalId(string animalId);
        ICollection<FoodDto> GetAllFood();
        Food GetByFoodId(string id);
        Food GetByFoodName(string name);
        bool FoodExists(string id);
        bool UpdateFoodFeed(string animalId);
        ICollection<AnimalMeal> GetMealsByAnimalId(string animalId);
        ICollection<FoodMeal> GetFoodsByMealId(string mealId);
    }
}
