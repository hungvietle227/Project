using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Interfaces
{
    public interface IScheduleService
    {
        bool AddSchedule(Schedule schedule);
        bool UpdateSchedule(Schedule schedule);
        ICollection<Schedule> GetAllSchedule();
        Schedule GetSchedule(string id);
        bool ScheduleExists(string id);
        ICollection<AnimalSchedule> GetScheduleByAnimalId(string id);
    }
}
