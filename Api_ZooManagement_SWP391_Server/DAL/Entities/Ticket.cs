using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class Ticket
    {
        public string TicketId { get; set; }

        public string Type {  get; set; }

        public double Price { get; set; }

        public ICollection<OrderTicket> OrderTickets { get; set; }

    }
}
