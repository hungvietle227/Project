using DTO.Dtos;
using AutoMapper;
using BBL.Interfaces;
using BBL.Services;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AreaController : ControllerBase
    {
        private readonly IAreaService _areaService;
        private readonly IMapper _mapper;
        public AreaController(IMapper mapper, IAreaService areaService)
        {
            _mapper = mapper;
            _areaService = areaService;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<AreaDto>))]
        public IActionResult GetArea()
        {
            var areas = _mapper.Map<List<AreaDto>>(_areaService.GetAll());
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(areas);
        }

        [HttpGet("pages/{page}")]
        [ProducesResponseType(200, Type = typeof(AreaResponseDto))]
        public IActionResult GetAllArea(int page)
        {
            var areas = _mapper.Map<List<AreaDto>>(_areaService.GetAll());

            var pageResults = 10f;
            var pageCount = Math.Ceiling(areas.Count / pageResults);

            var result = areas
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new AreaResponseDto
            {
                Areas = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpGet("areaId")]
        [ProducesResponseType(200, Type = typeof(Area))]
        public IActionResult GetArea(string areaId)
        {
            if (!_areaService.AreaExists(areaId))
                return NotFound();

            var area = _mapper.Map<AreaCreateDto>(_areaService.GetByAreaId(areaId));

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(area);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult CreateArea([FromBody] AreaCreateDto areaDto)
        {
            if (areaDto == null)
            {
                return BadRequest(ModelState);
            }

            if(_areaService.GetByAreaName(areaDto.AreaName) != null) 
                return BadRequest("Area existed");

            int count = _areaService.GetAll().Count() + 1;
            var areaId = "AE" + count.ToString().PadLeft(4, '0');

            var areaMap = _mapper.Map<Area>(areaDto);
            areaMap.AreaId = areaId;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_areaService.AddArea(areaMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving!!!");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully");
        }
        [HttpPut("{areaId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult UpdateArea(string areaId, [FromBody] AreaUpdateDto areaUpdateDto)
        {
            if (areaUpdateDto == null)
                return BadRequest(ModelState);

            if (areaId != areaUpdateDto.AreaId)
                return BadRequest(ModelState);

            if (!_areaService.AreaExists(areaId))
                return NotFound();

            var areaMap = _mapper.Map<Area>(areaUpdateDto);

            if (!ModelState.IsValid)
                return BadRequest();

            if (!_areaService.UpdateArea(areaMap))
            {
                ModelState.AddModelError("", "Error when updating area!!");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
