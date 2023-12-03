using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class OrderTicket
    {
        public string OrderId { get; set; }
        public string TicketId { get; set; }
        public int TicketQuantity { get; set; }
        public DateTime StartDate { get; set; }
        //define fk
        public Order Order { get; set; }
        public Ticket Ticket { get; set; }
    }
}
