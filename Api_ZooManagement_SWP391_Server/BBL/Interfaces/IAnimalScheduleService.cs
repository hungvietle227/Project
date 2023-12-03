using DAL.Entities;
using DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Interfaces
{
    public interface IAnimalScheduleService
    {
        bool AddAnimalSchedule(Animal animal, Animal? animalMap);
        ICollection<AnimalSchedule> GetScheduleByAnimalId(string animalId);
        ICollection<AnimalSchedule> GetAll();
        bool AnimalScheduleExisted(string animalId, string scheduleId);
        bool UpdateIsDone(string animalId, string scheduleId);
        bool ResetIsDone();
        bool UpdateHealth(string animalId);
    }
}
