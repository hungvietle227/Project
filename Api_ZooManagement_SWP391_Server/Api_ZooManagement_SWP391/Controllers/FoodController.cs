using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BBL.Interfaces;
using AutoMapper;
using DTO.Dtos;
using DAL.Entities;
using BBL.Services;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly IFoodService _foodService;
        private readonly IMapper _mapper;
        private readonly IFoodCategoryService _foodCategoryService;
        private readonly IAnimalService _animalService;

        public FoodController(IFoodService foodService, IMapper mapper, IFoodCategoryService foodCategoryService, IAnimalService animalService)
        {
            _foodService = foodService;
            _mapper = mapper;
            _foodCategoryService = foodCategoryService;
            _animalService = animalService;
        }

        [HttpGet()]
        [ProducesResponseType(200, Type = typeof(IEnumerable<FoodDto>))]
        public IActionResult GetFood()
        {
            var getFoods = _foodService.GetAllFood().ToList();
            return Ok(getFoods);
        }

        [HttpGet("pages/{page}")]
        [ProducesResponseType(200, Type = typeof(FoodResponseDto))]
        public IActionResult GetAllFood(int page)
        {
            var foods = _foodService.GetAllFood();

            var pageResults = 10f;
            var pageCount = Math.Ceiling(foods.Count / pageResults);

            var result = foods
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new FoodResponseDto
            {
                Foods = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpGet("foodId")]
        [ProducesResponseType(200, Type = typeof(Food))]
        [ProducesResponseType(400)]
        public IActionResult GetFood(string foodId)
        {
            if (!_foodService.FoodExists(foodId))
            {
                return NotFound();
            }
            var foods = _mapper.Map<FoodDto>(_foodService.GetByFoodId(foodId));
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok(foods);
        }


        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult CreateFood([FromBody] FoodCreateDto foodDto)
        {
            if (foodDto == null)
            {
                return BadRequest(ModelState);
            }

            var foodMap = _mapper.Map<Food>(foodDto);
            var cate = _foodCategoryService.GetByCateName(foodDto.CategoryName);
            var food = _foodService.GetByFoodName(foodDto.FName);

            if (food != null)
                return BadRequest("Food existed!!");

            if (cate == null)
                return BadRequest("Category not found");

            if (foodMap.Quantity == 0)
                return BadRequest("Fail to Add");
            int count = _foodService.GetAllFood().Count() + 1;
            var foodId = "FD" + count.ToString().PadLeft(4, '0');
            foodMap.FoodId = foodId;
            foodMap.Category = cate;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_foodService.AddFood(foodMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successful Created");
        }

        [HttpPut("{foodId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult UpdateFood(string foodId, [FromBody] FoodUpdateDto foodUpdate)
        {
            if (foodUpdate == null)
                return BadRequest(ModelState);

            if (foodId != foodUpdate.FoodId)
                return BadRequest(ModelState);

            if (!_foodService.FoodExists(foodId))
                return NotFound();

            var foodMap = _mapper.Map<Food>(foodUpdate);

            if (!ModelState.IsValid)
                return BadRequest();

            if (!_foodService.UpdateFood(foodMap))
            {
                ModelState.AddModelError("", "Error when updating food!!");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{foodId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult DeleteFood(string foodId)
        {
            if (!_foodService.FoodExists(foodId))
            {
                return NotFound();
            }

            var animals = _foodService.GetAnimalsByFoodId(foodId);

            if (animals != null)
                return BadRequest("Food still serve animals!!!");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_foodService.DeleteFood(foodId))
            {
                ModelState.AddModelError("", "Something went wrong while deleting food");
            }

            return NoContent();
        }
        [HttpPut("animalId")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult UpdateFoodEat(string animalId)
        {
            if (!_animalService.AnimalExists(animalId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var animalMeals = _foodService.GetMealsByAnimalId(animalId).ToList();
            foreach(var animalMeal in animalMeals)
            {
                var mealFoods = _foodService.GetFoodsByMealId(animalMeal.MealId).ToList();
                foreach (var food in mealFoods)
                {
                    if (food.Quantity > food.Quantity)
                    {
                        return BadRequest("Not enough food in zoo!!!");
                    }
                }
            }
            if (!_foodService.UpdateFoodFeed(animalId))
            {
                ModelState.AddModelError("", "Something went wrong while deleting food");
            }

            return Ok();
        }
    }
}
