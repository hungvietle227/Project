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
    public class CageService : ICageService
    {
        private readonly IGenericRepository<Cage> _cageRepository;
        private readonly IGenericRepository<Area> _areaRepository;
        private readonly IGenericRepository<AnimalCage> _aniCageRepository;

        public CageService(IGenericRepository<Cage> cageRepositiry,
                            IGenericRepository<Area> areaRepository,
                            IGenericRepository<AnimalCage> aniCageRepository)
        {
            _cageRepository = cageRepositiry;
            _areaRepository = areaRepository;
            _aniCageRepository = aniCageRepository;
        }
        public bool AddCage(Cage cage)
        {
            return _cageRepository.Add(cage);
        }

        public ICollection<Cage> GetAll()
        {
            return _cageRepository.GetAll();
        }

        public Cage GetByCageId(string id)
        {
            return _cageRepository.GetById(id);
        }

        public bool UpdateCage(Cage cageMap)
        {
            var cage = _cageRepository.GetById(cageMap.CId);
            if (cage == null) return false;
            cage.Name = cageMap.Name;
            cage.MaxCapacity = cageMap.MaxCapacity;
            return _cageRepository.Update(cage);
        }

        public bool CageExists(string id)
        {
            return _cageRepository.GetById(id) != null ? true : false;
        }

        public AnimalCage? GetAnimalCageByAnimalId(string animalId)
        {
            return _aniCageRepository.GetAll().SingleOrDefault(aniCage => aniCage.AnimalId == animalId && aniCage.OutCageDate == null);
        }

        public ICollection<Cage> GetCagesByAreaName(string areaName)
        {
            return _cageRepository.GetAll().Where(cage => cage.CId.StartsWith(areaName)).ToList();
        }

        public ICollection<Cage> GetAllAvailableCage()
        {
            return _cageRepository.GetAll().Where(c => c.AnimalQuantity < c.MaxCapacity).ToList();
        }
    }
}
