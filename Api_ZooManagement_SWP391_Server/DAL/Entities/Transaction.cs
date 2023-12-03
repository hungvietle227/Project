using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Transaction
    {
        public string TransactionId { get; set; }
        public string PaymentMethod { get; set; }
        public string TransactionInfo { get; set; }
        public DateTime TransactionDate { get; set; }
        public bool Status { get; set; }
        public Order Order { get; set; }
    }
}
