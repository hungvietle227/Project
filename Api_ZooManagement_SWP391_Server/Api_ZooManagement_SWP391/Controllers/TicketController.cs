using DTO.Dtos;
using AutoMapper;
using BBL.Interfaces;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        private readonly IMapper _mapper;

        public TicketController(ITicketService ticketService, IMapper mapper)
        {
            _ticketService = ticketService;
            _mapper = mapper;
        }

        [HttpGet()]
        [ProducesResponseType(200, Type = typeof(IEnumerable<TicketShowDto>))]
        public IActionResult GetTickets()
        {
            var tickets = _mapper.Map<List<TicketShowDto>>(_ticketService.GetTickets());

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(tickets);
        }

        [HttpGet("{ticketId}")]
        [ProducesResponseType(200, Type = typeof(Ticket))]
        [ProducesResponseType(400)]
        public IActionResult GetTicket(string ticketId)
        {
            if (!_ticketService.TicketExists(ticketId))
                return NotFound();

            var ticket = _mapper.Map<TicketDto>(_ticketService.GetTicket(ticketId));

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(ticket);
        }
    }
}
