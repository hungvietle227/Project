using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace DAL.Entities
{
    public class Order
    {
        public string OrderId { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public double TotalPrice {  get; set; }
        public ICollection<OrderTicket> OrderTickets { get; set; }
        public Transaction Transaction { get; set; }
        public string TransactionId { get; set; }
    }
}
