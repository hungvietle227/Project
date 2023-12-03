using DTO.Dtos;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Interfaces
{
    public interface IVnPayService
    {
        string CreatePaymentUrl(OrderCreateDto order, HttpContext context);
    }
}
