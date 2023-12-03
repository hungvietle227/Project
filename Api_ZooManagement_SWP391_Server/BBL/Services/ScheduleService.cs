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
    public class ScheduleService : IScheduleService
    {
        private readonly IGenericRepository<Schedule> _scheduleRepository;
        private readonly IGenericRepository<AnimalSchedule> _animalScheduleRepository;

        public ScheduleService(IGenericRepository<Schedule> scheduleRepository, IGenericRepository<AnimalSchedule> animalScheduleRepository)
        {
            _scheduleRepository = scheduleRepository;
            _animalScheduleRepository = animalScheduleRepository;
        }

        public bool AddSchedule(Schedule schedule)
        {
            return _scheduleRepository.Add(schedule);
        }

        public ICollection<Schedule> GetAllSchedule()
        {
            return _scheduleRepository.GetAll();
        }

        public Schedule GetSchedule(string id)
        {
            return _scheduleRepository.GetById(id);
        }

        public bool UpdateSchedule(Schedule schedule)
        {
            return _scheduleRepository.Update(schedule);
        }
        public bool ScheduleExists(string id)
        {
            return _scheduleRepository.GetById(id) != null ? true : false;
        }

        public ICollection<AnimalSchedule> GetScheduleByAnimalId(string id)
        {
            return _animalScheduleRepository.GetAll().Where(ac => ac.AnimalId == id).ToList();
        }
    }
}
