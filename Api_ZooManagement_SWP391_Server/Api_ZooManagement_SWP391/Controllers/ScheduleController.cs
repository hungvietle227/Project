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
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleService _scheduleService;
        private readonly IAnimalScheduleService _animalScheduleService;
        private readonly IMapper _mapper;
        public ScheduleController(IScheduleService scheduleService, IMapper mapper, IAnimalScheduleService animalScheduleService)
        {
            _scheduleService = scheduleService;
            _mapper = mapper;
            _animalScheduleService = animalScheduleService;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ScheduleDto>))]
        public IActionResult GetSchedule()
        {
            var schedule = _scheduleService.GetAllSchedule();
            var result = _mapper.Map<List<ScheduleDto>>(schedule);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(result);
        }
        [HttpGet("scheduleId")]
        public IActionResult GetSchedule(string id)
        {
            var schedule = _scheduleService.GetSchedule(id);
            if (schedule == null)
            {
                return NotFound();
            }
            return Ok(schedule);

        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult CreateSchedule([FromBody] ScheduleCreateDto scheduleDto)
        {
            if (scheduleDto == null)
            {
                return BadRequest(ModelState);
            }

            int count = _scheduleService.GetAllSchedule().Count() + 1;
            var scheduleId = "SC" + count.ToString().PadLeft(4, '0');

            var scheduleMap = _mapper.Map<Schedule>(scheduleDto);
            scheduleMap.ScheduleId = scheduleId;
            scheduleMap.Status = true;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_scheduleService.AddSchedule(scheduleMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving!!!");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully");
        }

        [HttpPut("{scheduleId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult UpdateSchedule(string scheduleId, [FromBody] ScheduleDto scheduleDto)
        {
            if(!_scheduleService.ScheduleExists(scheduleId))
                return NotFound();

            if (scheduleDto == null)
            {
                return BadRequest(ModelState);
            }

            if(!scheduleId.Equals(scheduleDto.ScheduleId))
                return BadRequest();

            var schedule = _scheduleService.GetSchedule(scheduleId);
            schedule.ScheduleName = scheduleDto.ScheduleName;
 

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_scheduleService.UpdateSchedule(schedule))
            {
                ModelState.AddModelError("", "Something went wrong while saving!!!");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully");
        }

        [HttpPut("UpdateSchedule")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateSchedule(string animalId, string scheduleId)
        {
            if (!_animalScheduleService.AnimalScheduleExisted(animalId, scheduleId))
            {
                return BadRequest("Schedule does not exist!!!");
            }

            if (_animalScheduleService.UpdateIsDone(animalId, scheduleId))
            {
                ModelState.AddModelError("", "Error when updating schedule");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpPut("ResetSchedule")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult ResetSchedule()
        {
            if (_animalScheduleService.ResetIsDone())
            {
                ModelState.AddModelError("", "Error when updating schedule");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpPut("UpdateScheduleHealth")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateScheduleHealth(string animalId)
        {
            if (!_animalScheduleService.AnimalScheduleExisted(animalId, "SC0005"))
            {
                return BadRequest("Schedule does not exist!!!");
            }

            if (_animalScheduleService.UpdateHealth(animalId))
            {
                ModelState.AddModelError("", "Error when updating!!!");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpDelete("{scheduleId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult DeleteSchedule(string scheduleId)
        {
            if (!_scheduleService.ScheduleExists(scheduleId))
                return NotFound();

            var schedule = _scheduleService.GetSchedule(scheduleId);
            schedule.Status = false;


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_scheduleService.UpdateSchedule(schedule))
            {
                ModelState.AddModelError("", "Something went wrong while saving!!!");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully");
        }

    }
}
