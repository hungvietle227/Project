using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Interfaces
{
    public interface IFoodCategoryService
    {
        bool AddFoodCate(FoodCategory foodCate);
        ICollection<FoodCategory> GetAll();
        FoodCategory GetByCateId(string id);
        bool CategoryExists(string id);
        FoodCategory GetByCateName(string name);
    }
}
