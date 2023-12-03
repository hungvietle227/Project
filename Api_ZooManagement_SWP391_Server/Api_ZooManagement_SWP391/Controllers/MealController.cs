using AutoMapper;
using BBL.Interfaces;
using BLL.Interfaces;
using DAL.Entities;
using DTO.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly IMealService _mealService;
        private readonly IMapper _mapper;
        private readonly IFoodService _foodService;

        public MealController(IMealService mealService, IMapper mapper, IFoodService foodService)
        {
            _mapper = mapper;
            _foodService = foodService;
            _mealService = mealService;
        }

        [HttpGet("meal")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<MealDto>))]
        public IActionResult GetMeal()
        {
            var meal = _mealService.GetMeals();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(meal);
        }

        [HttpGet("pages/{page}")]
        [ProducesResponseType(200, Type = typeof(MealResponseDto))]
        public IActionResult GetAllFood(int page)
        {
            var meals = _mealService.GetMeals();

            var pageResults = 10f;
            var pageCount = Math.Ceiling(meals.Count / pageResults);

            var result = meals
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new MealResponseDto
            {
                Meals = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateMeal([FromBody] CreateMealDto createMealDto)
        {
            if (createMealDto == null) return BadRequest();

            if(createMealDto.FoodMeals == null || createMealDto.FoodMeals.Count == 0)
            {
                return BadRequest("Food is empty!");
            }

            var mealMap = _mapper.Map<Meal>(createMealDto);

            int count = _mealService.CountMeal() + 1;
            var mealId = "ME" + count.ToString().PadLeft(4, '0');

            mealMap.MealId = mealId;

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_mealService.AddMeal(createMealDto.FoodMeals, mealMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Create Successfully!!!");
        }

        [HttpPut("{mealId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateMeal(string mealId, [FromBody] MealUpdateDto fMealDto)
        {
            if(_mealService.GetMealById(mealId) == null)
                return BadRequest("Meal does not exist!");

            if (fMealDto == null)
                return BadRequest("Food list is null!");
            
            if(mealId != fMealDto.MealId)
            {
                return BadRequest();
            }

            var meal = _mealService.GetMealById(mealId);
            var foodMeals = fMealDto.FoodMeals;

            if (foodMeals == null)
                return BadRequest();

            if (!_mealService.UpdateMeal(meal, foodMeals))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Update successfully!!!");
        }
    }
}
