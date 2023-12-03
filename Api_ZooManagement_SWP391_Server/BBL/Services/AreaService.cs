using DAL.Entities;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BBL.Interfaces;

namespace BBL.Services
{
    public class AreaService : IAreaService
    {
        private readonly IGenericRepository<Area> _areaRepository;
        private readonly IGenericRepository<Cage> _cageRepository;
        public AreaService(IGenericRepository<Area> areaRepository, IGenericRepository<Cage> cageRepository)
        {
            _areaRepository = areaRepository;
            _cageRepository = cageRepository;
        }

        public bool AddArea(Area area)
        {
            return _areaRepository.Add(area);
        }

        public ICollection<Area> GetAll()
        {
            return _areaRepository.GetAll();
        }

        public Area GetByAreaId(string id)
        {
            return _areaRepository.GetById(id);
        }

        public Area? GetByAreaName(string name)
        {
            return _areaRepository.GetAll().FirstOrDefault(a => a.AreaName == name);
        }

        public bool UpdateArea(Area areaMap)
        {
            var area = _areaRepository.GetById(areaMap.AreaId);
            area.Description = areaMap.Description;

            return _areaRepository.Update(area);
        }

        public bool AreaExists(string id)
        {
            return _areaRepository.GetById(id) != null ? true : false;
        }
    }
}
