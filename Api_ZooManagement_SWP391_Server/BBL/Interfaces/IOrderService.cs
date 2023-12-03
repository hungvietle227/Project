using DAL.Entities;
using DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Interfaces
{
    public interface IOrderService
    {
        bool AddOrder(List<OrderTicket> ordTickets, Order order);
        ICollection<OrderDto> GetAllOrders();
        ICollection<StatisticDto> GetStatistics();
        Order GetOrder(string id);
        bool OrderExists(string id);

    }
}
