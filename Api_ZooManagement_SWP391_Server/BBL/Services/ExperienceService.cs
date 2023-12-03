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
    public class ExperienceService : IWorkExperienceService
    {
        private readonly IGenericRepository<WorkExperience> _expRepo;

        public ExperienceService(IGenericRepository<WorkExperience> expRepo)
        {
            _expRepo = expRepo;
        }
        public bool AddExperience(WorkExperience workExperience)
        {
            return _expRepo.Add(workExperience);
        }

        public WorkExperience GetExperience(string id)
        {
            return _expRepo.GetById(id);
        }

        public WorkExperience? GetExperienceByPosition(string position)
        {
            var experience = _expRepo.GetAll();
            if(experience != null && experience.Count > 0)
            {
                var exp = experience.FirstOrDefault(ex => ex.Position.ToLower() == position.ToLower());
                return exp;
            }
            return null;
        }

        public ICollection<WorkExperience> GetExperiences()
        {
            return _expRepo.GetAll().ToList();
        }
    }
}
