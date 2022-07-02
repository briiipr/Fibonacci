using Fibonacci.App.Services.Interfaces;
using Fibonacci.DataAccess.Services.Interfaces;
using Fibonacci.Domain.Models;

namespace Fibonacci.App.Services
{
    public class FibonacciService : IFibonacciService
    {
        private readonly IDBService _db;
        public FibonacciService(IDBService dBService)
        {
            _db = dBService;
        }
        public long CalculateFibonacciNumber(int requestNumber)
        {
            if (requestNumber == null || requestNumber < 0)
            {
                long resultNumber = -1;
                _db.InsertRequestInfo(CreateFibonacciRequestInfo(requestNumber, resultNumber));
                return resultNumber;
            }

            long convertedRequestNumber = Convert.ToInt64(requestNumber);

            if (requestNumber == 0 || requestNumber == 1)
            {
                _db.InsertRequestInfo(CreateFibonacciRequestInfo(requestNumber, convertedRequestNumber));
                return convertedRequestNumber;
            }

            
            long fibonacciNumber = HandleFibonacciValues(convertedRequestNumber);
            _db.InsertRequestInfo(CreateFibonacciRequestInfo(requestNumber, fibonacciNumber));

            return fibonacciNumber;
        }

        private FibonacciRequestInfo CreateFibonacciRequestInfo(int requestNumber, long resultNumber)
        {
            return new FibonacciRequestInfo()
            {
                RequestDate = DateTime.Now,
                RequestedNumber = requestNumber,
                ResultNumber = resultNumber
            };
        }

        private long HandleFibonacciValues(long inputNumber)
        {
            long previousNumber = 0;
            long nextNumber = 1;
            for(long i = 1; i < inputNumber; i++)
            {
                long sumResult = previousNumber + nextNumber;
                previousNumber = nextNumber;
                nextNumber = sumResult;
            }
            return nextNumber;
        }
    }
}
