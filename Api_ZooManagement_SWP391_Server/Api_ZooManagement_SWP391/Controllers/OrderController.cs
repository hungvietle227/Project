using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BBL.Interfaces;
using DAL.Entities;
using AutoMapper;
using DTO.Dtos;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ITicketService _ticketService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper,
            ITicketService ticketService)
        {
            _orderService = orderService;
            _ticketService = ticketService;
            _mapper = mapper;
        }

        [HttpGet()]
        [ProducesResponseType(200, Type = typeof(IEnumerable<OrderDto>))]
        public IActionResult GetAllOrder()
        {
            var orders = _mapper.Map<List<OrderDto>>(_orderService.GetAllOrders());
            if (!ModelState.IsValid) return BadRequest();
            return Ok(orders);
        }

        [HttpGet("{orderId}")]
        [ProducesResponseType(200, Type = typeof(OrderDto))]
        [ProducesResponseType(400)]
        public IActionResult GetOrder(string orderId)
        {
            if(!_orderService.OrderExists(orderId)) return NotFound();

            var order = _mapper.Map<OrderDto>(_orderService.GetOrder(orderId));

            if(!ModelState.IsValid) return BadRequest();

            return Ok(order);
        }

        [HttpGet("statistic")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<StatisticDto>))]
        public IActionResult GetStatistic()
        {
            return Ok(_orderService.GetStatistics());
        }

        [HttpGet("pages/{page}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<OrderDto>))]
        public IActionResult GetAllOrders(int page)
        {
            var orders = _mapper.Map<List<OrderDto>>(_orderService.GetAllOrders());

            var pageResults = 10f;
            var pageCount = Math.Ceiling(orders.Count / pageResults);

            var result = orders
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new OrderResponseDto
            {
                Orders = result,
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
        public IActionResult CreateOrder([FromBody] PaymentResponseDto response)
        {
            if (response == null)
                return BadRequest("response fail");

            var orderMap = _mapper.Map<Order>(response.OrderCreate);
            var trans = _mapper.Map<Transaction>(response);
            if (orderMap == null || trans == null)
                return BadRequest();

            if (response.Success.Equals("success"))
            {
                trans.Status = true;
            }
            else trans.Status = false;

            trans.TransactionDate = DateTime.Now;

            int count = _orderService.GetAllOrders().Count() + 1;
            orderMap.OrderId = "OD" + count.ToString().PadLeft(4, '0');
            orderMap.Transaction = trans;

            var TicketQuantities = response.OrderCreate.Tickets;
            List<OrderTicket> orderTickets = new List<OrderTicket>();
            if (TicketQuantities == null || TicketQuantities.Count() == 0)
            {
                return BadRequest("No ticket");
            }
            foreach (var ticketQuantity in TicketQuantities)
            {
                var ticket = _ticketService.GetTicketByType(ticketQuantity.Type);

                if (ticket == null) return BadRequest("Ticket Not Found");

                if (ticketQuantity.StartDate < DateTime.Now)
                    return BadRequest("Please place order from today");

                if (ticketQuantity.Amount == 0) continue;
                orderTickets.Add(new OrderTicket()
                {
                       Order = orderMap,
                       Ticket = ticket,
                       TicketQuantity = ticketQuantity.Amount,
                       StartDate = ticketQuantity.StartDate
                });
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_orderService.AddOrder(orderTickets, orderMap))
                {
                    ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successful Created");
        }


    }
}
