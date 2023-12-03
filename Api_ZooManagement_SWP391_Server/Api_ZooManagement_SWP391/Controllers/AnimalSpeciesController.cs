using AutoMapper;
using BBL.Interfaces;
using BBL.Services;
using DAL.Entities;
using DTO.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalSpeciesController : ControllerBase
    {
        private readonly IAnimalSpeciesService _animalSpeciesService;
        private readonly IMapper _mapper;
        private readonly IAnimalService _animalService;

        public AnimalSpeciesController(IAnimalService animalService, IAnimalSpeciesService animalSpeciesService, IMapper mapper)
        {
            _animalService  = animalService;
            _mapper = mapper;   
            _animalSpeciesService = animalSpeciesService;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult GetAllSpecies()
        {
            var foodCate = _animalSpeciesService.GetAll();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(foodCate);
        }

        [HttpGet("pages/{page}")]
        [ProducesResponseType(200, Type = typeof(SpeciesResponseDto))]
        public IActionResult GetAllSpecies(int page)
        {
            var species = _mapper.Map<List<SpeciesDto>>(_animalSpeciesService.GetAll());

            var pageResults = 10f;
            var pageCount = Math.Ceiling(species.Count / pageResults);

            var result = species
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new SpeciesResponseDto
            {
                Species = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpGet("pagesSpecies/{page}")]
        [ProducesResponseType(200, Type = typeof(SpeciesResponseDto))]
        public IActionResult GetAllSpeciesPage(int page)
        {
            var species = _animalSpeciesService.GetSpeciesAnimal();

            var pageResults = 10f;
            var pageCount = Math.Ceiling(species.Count / pageResults);

            var result = species
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new SpeciesCountResponseDto
            {
                Species = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpGet("AnimalSpeciesId")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult GetBySpeciesId(string id)
        {
            var animalSpecies = _animalSpeciesService.GetBySpeciesId(id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(animalSpecies);
        }

        [HttpGet("CountAnimalInSpecies")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult CountAnimalInSpecies()
        {
            var animalSpecies = _animalSpeciesService.GetSpeciesAnimal();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(animalSpecies);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult CreateAnimalSpecies([FromBody] AnimalSpeciesDto speciesDto)
        {
            if (speciesDto == null)
            {
                return BadRequest(ModelState);
            }

            if (_animalSpeciesService.GetBySpeciesName(speciesDto.SpeciesName) != null)
                return BadRequest("Species existed");

            int count = _animalSpeciesService.GetAll().Count() + 1;
            var speciesId = "SA" + count.ToString().PadLeft(4, '0');

            var speciesMap = _mapper.Map<AnimalSpecies>(speciesDto);
            speciesMap.SpeciesId = speciesId;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_animalSpeciesService.AddAnimalSpecies(speciesMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving!!!");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully");
        }
    }
}
