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
    public class ExperienceController : ControllerBase
    {
        private readonly IWorkExperienceService _experienceService;
        private readonly IMapper _mapper;

        public ExperienceController(IWorkExperienceService experienceService, IMapper mapper)
        {
            _experienceService = experienceService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<WorkExperienceDto>))]
        public IActionResult GetAllExperience()
        {
            var exps = _mapper.Map<List<WorkExperienceDto>>(_experienceService.GetExperiences());
            if(!ModelState.IsValid) 
                return BadRequest(exps);
            return Ok(exps);
            
        }

        [HttpGet("pages/{page}")]
        [ProducesResponseType(200, Type = typeof(ExperienceResponseDto))]
        public IActionResult GetAllExperience(int page)
        {
            var exps = _mapper.Map<List<ExperienceDetailDto>>(_experienceService.GetExperiences());

            var pageResults = 10f;
            var pageCount = Math.Ceiling(exps.Count / pageResults);

            var result = exps
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new ExperienceResponseDto
            {
                Experiences = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult AddExperience([FromBody] ExperienceCreateDto expCreate)
        {
            if (expCreate == null)
                return BadRequest();

            if (_experienceService.GetExperienceByPosition(expCreate.Position) != null)
                return BadRequest("Position existed");

            var exp = _mapper.Map<WorkExperience>(expCreate);
            int count = _experienceService.GetExperiences().Count() + 1;
            var expId = "EX" + count.ToString().PadLeft(4, '0');
            exp.ExperienceId = expId;

            if (!ModelState.IsValid)
                return BadRequest(exp);

            if(!_experienceService.AddExperience(exp))
            {
                ModelState.AddModelError("", "Error when adding experience!!!");
                return BadRequest(ModelState);
            }

            return Ok("Create Successfully");
        }
    }
}
