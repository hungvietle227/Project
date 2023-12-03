using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Interfaces
{
    public interface IAreaService
    {
        bool AddArea(Area area);
        bool UpdateArea(Area area);
        ICollection<Area> GetAll();
        Area GetByAreaId(string id);
        Area? GetByAreaName(string name);
        bool AreaExists(string id);
    }
}
