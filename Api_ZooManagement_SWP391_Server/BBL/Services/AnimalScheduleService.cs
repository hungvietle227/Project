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
    public class AnimalScheduleService : IAnimalScheduleService
    {
        private readonly IGenericRepository<AnimalSchedule> _animalScheduleRepo;
        private readonly IGenericRepository<Animal> _animalRepo;
        private readonly IGenericRepository<Schedule> _scheduleRepo;

        public AnimalScheduleService(IGenericRepository<Animal> animalRepo, IGenericRepository<AnimalSchedule> animalScheduleRepo, IGenericRepository<Schedule> scheduleRepo)
        {
            _animalRepo = animalRepo;
            _animalScheduleRepo = animalScheduleRepo;
            _scheduleRepo = scheduleRepo;
        }
        public bool AddAnimalSchedule(Animal animal, Animal? animalMap)
        {
            if (animalMap != null)
            {
                animal.AnimalSchedules = animalMap.AnimalSchedules;
            }
            return _animalRepo.Update(animal);
        }

        public bool AnimalScheduleExisted(string animalId, string scheduleId)
        {
            return _animalScheduleRepo.GetAll().Where(schedule => schedule.AnimalId == animalId && schedule.ScheduleId == scheduleId).FirstOrDefault() != null ? true : false;
        }

        public ICollection<AnimalSchedule> GetAll()
        {
            return _animalScheduleRepo.GetAll();
        }

        public ICollection<AnimalSchedule> GetScheduleByAnimalId(string animalId)
        {
            return _animalScheduleRepo.GetAll().Where(schedule => schedule.AnimalId == animalId).ToList();
        }
        public bool ResetIsDone()
        {
            var animalSchedule = _animalScheduleRepo.GetAll().ToList();
            foreach (var schedule in animalSchedule)
            {
                if (schedule.ScheduleId == "SC0001" || schedule.ScheduleId == "SC0002" || schedule.ScheduleId == "SC0003" || schedule.ScheduleId == "SC0004")
                {
                    schedule.IsDone = false;
                    _animalScheduleRepo.Update(schedule);
                }
            }
            return false;
        }

        public bool UpdateHealth(string animalId)
        {
            var animalSchedule = _animalScheduleRepo.GetAll().Where(asc => asc.AnimalId == animalId && asc.ScheduleId == "SC0005").ToList();
            var animal = _animalRepo.GetById(animalId);
            foreach (var schedule in animalSchedule)
            {
                animal.HealthCheck = "Being treatment";
                _animalRepo.Update(animal);
                _animalScheduleRepo.Delete(schedule);

            }

            return false;
        }

        public bool UpdateIsDone(string animalId, string scheduleId)
        {
            var animalSchedule = _animalScheduleRepo.GetAll().Where(asc => asc.AnimalId == animalId && asc.ScheduleId == scheduleId).ToList();
            foreach (var schedule in animalSchedule)
            {
                if (scheduleId == "SC0001" || scheduleId == "SC0002" || scheduleId == "SC0003" || scheduleId == "SC0004")
                {
                    schedule.IsDone = true;
                    _animalScheduleRepo.Update(schedule);
                }
                else
                {
                    _animalScheduleRepo.Delete(schedule);
                }
            }
            return false;
        }
    }
}
