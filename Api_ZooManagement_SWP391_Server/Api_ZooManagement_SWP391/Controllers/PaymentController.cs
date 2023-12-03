using BBL.Interfaces;
using DTO.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IVnPayService _vnPayService;

        public PaymentController(IVnPayService vnPayService)
        {
            _vnPayService = vnPayService;
        }

        [HttpPost()]
        public IActionResult CreatePaymentUrl(OrderCreateDto order)
        {
            var url = _vnPayService.CreatePaymentUrl(order, HttpContext);

            return Ok(Redirect(url));
        }
    }
}
