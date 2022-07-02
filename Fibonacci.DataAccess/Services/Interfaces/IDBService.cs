using Fibonacci.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fibonacci.DataAccess.Services.Interfaces
{
    public interface IDBService
    {
        public List<FibonacciRequestInfo> GetAllRequestInfos();
        public bool InsertRequestInfo(FibonacciRequestInfo fibonacciRequest);
    }
}
