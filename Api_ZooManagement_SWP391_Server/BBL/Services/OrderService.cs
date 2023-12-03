using BBL.Interfaces;
using DAL.Entities;
using DAL.Repositories;
using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using Microsoft.Extensions.Configuration;
using DTO.Dtos;
using System.Globalization;

namespace BBL.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<OrderTicket> _ordTicketRepo;
        private readonly IGenericRepository<Transaction> _transRepo;
        private readonly IConfiguration _config;

        public OrderService(IGenericRepository<Order> orderRepo,
                            IGenericRepository<Ticket> ticketRepo,
                            IGenericRepository<OrderTicket> ordTicketRepo,
                            IGenericRepository<Transaction> transRepo,
                            IConfiguration config)
        {
            _orderRepo = orderRepo;
            _ordTicketRepo = ordTicketRepo;
            _transRepo = transRepo;
            _config = config;
        }

        public bool AddOrder(List<OrderTicket> ordTickets, Order order)
        {
            if (ordTickets == null || ordTickets.Count == 0) return false;
            double totalPrice = ordTickets.Sum(u => u.Ticket.Price * u.TicketQuantity);
            if (!totalPrice.Equals(order.TotalPrice)) return false;
            foreach(OrderTicket ticket in ordTickets)
            {
                _ordTicketRepo.Add(ticket);
            }
            var ticketAldult = _ordTicketRepo.GetAll().Where(ot => ot.OrderId == order.OrderId && ot.TicketId == "TK0001").FirstOrDefault();
            var ticketChild = _ordTicketRepo.GetAll().Where(ot => ot.OrderId == order.OrderId && ot.TicketId == "TK0002").FirstOrDefault();
            var ticketDate = _ordTicketRepo.GetAll().Where(ot => ot.OrderId == order.OrderId).FirstOrDefault();

            var trans = order.Transaction;
            DateTime s = trans.TransactionDate;
            DateTime go = ticketDate.StartDate;
            var email = new MimeMessage();
            string tickAdult = "0";
            string tickChild = "0";
            if (ticketAldult != null)
            {
                tickAdult = ticketAldult.TicketQuantity.ToString();
            }
            if(ticketChild != null)
            {
                tickChild = ticketChild.TicketQuantity.ToString();
            }

            email.From.Add(MailboxAddress.Parse("mapmapzoofpt@gmail.com"));
            email.To.Add(MailboxAddress.Parse(order.Email));
            email.Subject = "Order from Mapmap zoo";
            email.Body = new TextPart(TextFormat.Html) { Text = " <h3>This is your order details: </h3>" 
                                                                                                + "<div> Your order id: " + "<b>" + order.OrderId + "</b>" + "</div>" 
                                                                                                + "<div>Your email is: " + order.Email + "<div>"
                                                                                                + "<div>Your fullname is: " + order.FullName + "<div>"
                                                                                                + "<div style ='color: 'black''>Your Adult ticket: " + tickAdult + "</div>"
                                                                                                + "<div>Your Child ticket: " + tickChild + "</div>"
                                                                                                + "<div>Your total price: " + totalPrice + " VND" + "</div>"
                                                                                                + "<div>The date that you go: " + go.ToString().Substring(0, 10) + "</div>"
                                                                                                + "<div>Transaction infor: " + trans.TransactionInfo.ToString() + "</div>"
                                                                                                + "<div>Transaction date: " + s.ToString().Substring(0, 10) + "</div>"
                                                                                                + "MapMap Zoo thank you for join with us!!!" };

            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_config.GetSection("EmailUser").Value, _config.GetSection("EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);
            return true;
        }

        public ICollection<OrderDto> GetAllOrders()
        {
            List<OrderDto> orderDtos = new List<OrderDto>();
            var orders = _orderRepo.GetAll().ToList();
            if(orders != null && orders.Count > 0)
            {
                foreach (var order in orders)
                {
                    OrderDto ord = new OrderDto()
                    {
                        OrderId = order.OrderId,
                        Email = order.Email,
                        FullName = order.FullName,
                        PhoneNumber = order.PhoneNumber,
                        TotalPrice = order.TotalPrice,
                        StartDate = _transRepo.GetById(order.TransactionId).TransactionDate,
                        TransactionId = order.TransactionId,
                    };
                    orderDtos.Add(ord);
                }
            }
            return orderDtos.ToList();
        }

        public Order GetOrder(string id)
        {
            return _orderRepo.GetById(id);
        }

        public ICollection<StatisticDto> GetStatistics()
        {
            List<StatisticDto> staList = new List<StatisticDto>();
            for (int i = 1; i <= 12; i++)
            {
                staList.Add(new StatisticDto()
                {
                    Month = i,
                    TotalPrice = 0,
                    TotalTicket = 0
                });
            }
            var ordDetails = _ordTicketRepo.GetAll();
            foreach(var ord in ordDetails)
            {
                int month = ord.StartDate.Month;
                var order = _orderRepo.GetById(ord.OrderId);
                staList[month - 1].TotalPrice += order.TotalPrice;
                staList[month - 1].TotalTicket += ord.TicketQuantity;
            }
            return staList.ToList();
        }

        public bool OrderExists(string id)
        {
            if (_orderRepo.GetById(id) != null) return true;
            return false;
        }

    }
}
