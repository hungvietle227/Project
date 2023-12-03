using BBL.Interfaces;
using BBL.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DTO.Dtos;
using AutoMapper;
using DAL.Entities;
using System.Text.RegularExpressions;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CageController : ControllerBase
    {
        private readonly ICageService _cageService;
        private readonly IAreaService _areaService;
        private readonly IMapper _mapper;
        public Regex areaFormat = new Regex(@"^AE\d{3}");

        public CageController(IMapper mapper, ICageService cageService, IAreaService areaService)
        {
            _cageService = cageService;
            _mapper = mapper;
            _areaService = areaService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CageDto>))]
        public IActionResult GetCage()
        {
            var cages = _mapper.Map<List<CageDto>>(_cageService.GetAll());
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(cages);
        }
        [HttpGet("CageId")]
        [ProducesResponseType(200, Type = typeof(CageDto))]
        public IActionResult GetArea(string cageId)
        {
            if (!_cageService.CageExists(cageId))
                return NotFound();

            var cage = _mapper.Map<CageDto>(_cageService.GetByCageId(cageId));

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(cage);
        }

        [HttpGet("pages/{page}")]
        [ProducesResponseType(200, Type = typeof(CageResponseDto))]
        public IActionResult GetAllCages(int page)
        {
            var cages = _mapper.Map<List<CageDto>>(_cageService.GetAll());

            var pageResults = 10f;
            var pageCount = Math.Ceiling(cages.Count / pageResults);

            var result = cages
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new CageResponseDto
            {
                Cages = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpGet("AvailableCage")]
        [ProducesResponseType(200, Type = typeof(CageDto))]
        public IActionResult GetAvailableCage()
        {
            var cages = _mapper.Map<List<CageDto>>(_cageService.GetAllAvailableCage());
            if (!ModelState.IsValid)
                return BadRequest();
            return Ok(cages);
        }

        [HttpPost]
        //[Authorize(Roles = "STAFF")]
        public IActionResult CreateCage([FromQuery] string areaId, [FromBody] CageCreateDto cageDto)
        {
            if (cageDto == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cageMap = _mapper.Map<Cage>(cageDto);
            var area = _areaService.GetByAreaId(areaId);
            if (area == null)
                return BadRequest();

            int count = _cageService.GetCagesByAreaName(area.AreaName).Count() + 1;
            var cageId = area.AreaName + count.ToString().PadLeft(4, '0');

            cageMap.CId = cageId;
            cageMap.Area = area;
            cageMap.AnimalQuantity = 0;
            if (cageMap.MaxCapacity < cageMap.AnimalQuantity)
            {
                ModelState.AddModelError("", "Animal quantity must less than max capacity");
                return BadRequest(ModelState);
            }

            if (!_cageService.AddCage(cageMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving!!!");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully");
        }

        [HttpPut("{cageId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult UpdateCage(string cageId, [FromBody] CageUpdateDto cageUpdateDto)
        {
            if (cageUpdateDto == null)
                return BadRequest(ModelState);

            if (cageId != cageUpdateDto.CId)
                return BadRequest(ModelState);

            if (!_cageService.CageExists(cageId))
                return NotFound();

            var cageMap = _mapper.Map<Cage>(cageUpdateDto);

            if (!ModelState.IsValid)
                return BadRequest();

            if (!_cageService.UpdateCage(cageMap))
            {
                ModelState.AddModelError("", "Error when updating cage!!");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
