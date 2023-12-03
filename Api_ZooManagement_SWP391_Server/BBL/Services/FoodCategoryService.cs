using BBL.Interfaces;
using DAL.Entities;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Services
{
    public class FoodCategoryService : IFoodCategoryService
    {
        private readonly IGenericRepository<FoodCategory> _foodCategoryRepository;

        public FoodCategoryService(IGenericRepository<FoodCategory> foodCategoryRepo)
        {
            _foodCategoryRepository = foodCategoryRepo;
        }
        public bool AddFoodCate(FoodCategory foodCate)
        {
            return _foodCategoryRepository.Add(foodCate);
        }

        public bool CategoryExists(string id)
        {
            return _foodCategoryRepository.GetById(id) != null ? true : false;
        }

        public ICollection<FoodCategory> GetAll()
        {
            return _foodCategoryRepository.GetAll();
        }

        public FoodCategory GetByCateId(string id)
        {
            return _foodCategoryRepository.GetById(id);
        }

        public FoodCategory GetByCateName(string name)
        {
            return _foodCategoryRepository.GetAll().Where(cate => cate.CategoryName == name).FirstOrDefault();
        }
    }
}
