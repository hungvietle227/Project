using DAL.Entities;


namespace BBL.Interfaces
{
    public interface ICageService
    {
        bool AddCage(Cage cage);
        bool UpdateCage(Cage cage);
        ICollection<Cage> GetAll();
        Cage GetByCageId(string id);
        ICollection<Cage> GetCagesByAreaName(string areaName);
        AnimalCage GetAnimalCageByAnimalId(string animalId);
        bool CageExists(string id);
        ICollection<Cage> GetAllAvailableCage();
    }
}
