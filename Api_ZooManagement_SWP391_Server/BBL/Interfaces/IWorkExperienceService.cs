using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Interfaces
{
    public interface IWorkExperienceService
    {
        ICollection<WorkExperience> GetExperiences();
        WorkExperience GetExperience(string id);
        WorkExperience? GetExperienceByPosition(string position);
        bool AddExperience(WorkExperience workExperience);
    }
}
