using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Interfaces
{
    public interface ITicketService
    {
        Ticket GetTicket(string ticketId);
        Ticket GetTicketByType(string type);
        ICollection<Ticket> GetTickets();
        bool AddTicket(Ticket ticket);
        bool UpdateTicket(Ticket ticket);
        bool TicketExists(string ticketId);
    }
}
