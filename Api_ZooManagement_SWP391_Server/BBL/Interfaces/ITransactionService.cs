using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Interfaces
{
    public interface ITransactionService
    {
        bool AddTransaction(Transaction transaction);
        Transaction GetTransById(string transactionId);
        ICollection<Transaction> GetTransactions();
    }
}
