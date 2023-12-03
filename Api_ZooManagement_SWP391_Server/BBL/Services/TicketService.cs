using BBL.Interfaces;
using DAL.Entities;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Services
{
    public class TicketService : ITicketService
    {
        private readonly IGenericRepository<Ticket> _ticketRepo;

        public TicketService(IGenericRepository<Ticket> ticketRepo)
        {
            _ticketRepo = ticketRepo;
        }
        public bool AddTicket(Ticket ticket)
        {
            throw new NotImplementedException();
        }

        public Ticket GetTicket(string ticketId)
        {
            return _ticketRepo.GetById(ticketId);
        }

        public Ticket GetTicketByType(string type) => _ticketRepo.GetAll().FirstOrDefault(t => t.Type == type);

        public ICollection<Ticket> GetTickets()
        {
            return _ticketRepo.GetAll();
        }

        public bool TicketExists(string ticketId)
        {
            var ticket = _ticketRepo.GetById(ticketId);
            if (ticket != null)
                return true;
            return true;
        }

        public bool UpdateTicket(Ticket ticket)
        {
            if(ticket != null)
            {
                return _ticketRepo.Update(ticket);
            }
            return false;
        }
    }
}
