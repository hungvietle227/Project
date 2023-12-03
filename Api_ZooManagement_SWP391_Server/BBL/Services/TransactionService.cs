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
    public class TransactionService : ITransactionService
    {
        private readonly IGenericRepository<Transaction> _transRepo;

        public TransactionService(IGenericRepository<Transaction> transRepo)
        {
            _transRepo = transRepo;
        }
        public bool AddTransaction(Transaction transaction)
        {
            return _transRepo.Add(transaction);
        }

        public ICollection<Transaction> GetTransactions()
        {
            return _transRepo.GetAll().ToList();
        }

        public Transaction GetTransById(string transactionId)
        {
           return _transRepo.GetById(transactionId);
        }
    }
}
