
using AutoMapper;
using DTO.Dtos;
using DAL.Entities;


namespace Api_ZooManagement_SWP391.Profiles
{
    public class Mapper : Profile
    {

        public Mapper()
        {
            #region
            CreateMap<Order, OrderDto>();
            CreateMap<Ticket, TicketDto>();
            CreateMap<News, NewsDto>();
            CreateMap<NewsCreateDto, News>();
            CreateMap<News, NewsUpdateDto>();
            CreateMap<NewsUpdateDto, News>();
            CreateMap<Review, ReviewDto>();
            CreateMap<ReviewDto, Review>();
            CreateMap<Review, ReviewUpdateDto>();
            CreateMap<ReviewUpdateDto, Review>();
            CreateMap<User, UserDto>();
            CreateMap<UserCreateDto, User>();
            CreateMap<Area, AreaCreateDto>();
            CreateMap<Area, AreaDto>();
            CreateMap<AreaCreateDto, Area>();
            CreateMap<Cage, CageCreateDto>();
            CreateMap<CageCreateDto, Cage>();
            CreateMap<Cage, CageDto>();
            CreateMap<FoodDto, Food>();
            CreateMap<Food, FoodDto>(); 
            CreateMap<FoodUpdateDto, Food>();
            CreateMap<AnimalSchedule, AnimalScheduleDto>();
            CreateMap<AnimalScheduleDto, AnimalSchedule>();
            CreateMap<AnimalTrainer, AnimalTrainerDto>();
            CreateMap<AnimalTrainerDto, AnimalTrainer>();
            CreateMap<OrderDto, Order>();
            CreateMap<Order, OrderDto>();
            CreateMap<OrderCreateDto, Order>();
            CreateMap<TicketDto, Ticket>();
            CreateMap<Ticket, TicketShowDto>();
            CreateMap<UpdateAnimalDto, Animal>();
            CreateMap<Animal, UpdateAnimalDto>();
            CreateMap<AnimalTrainer, UpdateAnimalDto>();
            CreateMap<UpdateAnimalDto, AnimalTrainer>();
            CreateMap<UpdateAnimalDto, AnimalCage>();
            CreateMap<User, UserUpdateDto>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<Animal, AnimalCreateDto>();
            CreateMap<AnimalCreateDto, Animal>();
            CreateMap<AnimalCreateDto, AnimalTrainer>();
            CreateMap<AnimalTrainer, AnimalCreateDto>();
            CreateMap<AnimalCage, AnimalCreateDto>();
            CreateMap<AnimalCreateDto, AnimalCage>();
            CreateMap<Animal, GetAnimalDto>();
            CreateMap<Cage, GetAnimalDto>();
            CreateMap<AnimalTrainer, AvailableTrainer>();
            CreateMap<User, AvailableTrainer>();
            CreateMap<Animal, AnimalCreateDto>();
            CreateMap<AnimalCreateDto, Animal>();
            CreateMap<AnimalTrainer, GetAnimalDto>();
            CreateMap<AnimalCage, GetAnimalDto>();
            CreateMap<ExperienceDetail, ExperienceDetailDto>();
            CreateMap<ScheduleDto, Schedule>();
            CreateMap<Schedule, ScheduleDto>();
            CreateMap<ScheduleCreateDto, Schedule>();
            CreateMap<Schedule, ScheduleCreateDto>();
            CreateMap<PaymentResponseDto, Transaction>();
            CreateMap<AnimalSchedule, AnimalScheduleCreateDto>();
            CreateMap<AnimalScheduleCreateDto, AnimalSchedule>();
            CreateMap<Animal, AnimalScheduleDto>();
            CreateMap<AnimalScheduleDto, Animal>();
            CreateMap<WorkExperience, WorkExperienceDto>();
            CreateMap<ExperienceCreateDto, WorkExperience>();
            CreateMap<FoodCategoryDto, FoodCategory>();
            CreateMap<FoodCategory, FoodCategoryDto>();
            CreateMap<AnimalSpeciesDto, AnimalSpecies>();
            CreateMap<AnimalSpecies, GetAnimalDto>();
            CreateMap<FoodCreateDto, Food>();
            CreateMap<Review, ReviewCreateDto>();
            CreateMap<ReviewCreateDto, Review>();
            CreateMap<Food, FoodAmountDto>();
            CreateMap<FoodAmountDto, Food>();
            CreateMap<UpdateAnimalDto, AnimalSchedule>();
            CreateMap<AnimalSchedule, UpdateAnimalDto>();
            CreateMap<AnimalSchedule, UpdateAnimalScheduleDto>();
            CreateMap<UpdateAnimalScheduleDto, AnimalSchedule>();
            CreateMap<UpdateAnimalScheduleDto, Schedule>();
            CreateMap<Schedule, UpdateAnimalScheduleDto>();
            CreateMap<AnimalSpecies, SpeciesDto>();
            CreateMap<FoodCategory, FoodCategoryPaginationDto>();
            CreateMap<WorkExperience, ExperienceDetailDto>();
            CreateMap<CageUpdateDto, Cage>();
            CreateMap<AreaUpdateDto, Area>();
            CreateMap<WorkExperience, ExperienceUserDto>();
            CreateMap<ExperienceDetail, ExperienceUserDto>();
            CreateMap<MealDto, Meal>();
            CreateMap<Meal, MealDto>();
            CreateMap<Meal, CreateMealDto>();
            CreateMap<CreateMealDto, Meal>();
            CreateMap<FoodMeal, FoodMealDto>();
            CreateMap<FoodMealDto, FoodMeal>();
            CreateMap<CreateAnimalMealDto, AnimalMeal>();
            CreateMap<UpdateAnimalMealDto, AnimalMeal>();
            CreateMap<GetFoodMealDto, FoodMeal>();
            CreateMap<FoodMeal, GetFoodMealDto>();
            CreateMap<AnimalMeal, UpdateAnimalDto>();
            CreateMap<UpdateAnimalDto, AnimalMeal>();
            CreateMap<UpdateAnimalMealDto, AnimalMeal>();
            CreateMap<AnimalMeal, UpdateAnimalMealDto>();
            CreateMap<GetMealAnimalDto, AnimalMeal>();
            CreateMap<AnimalMeal, GetMealAnimalDto>();
            #endregion
        }

    }
}
