using Fibonacci.DataAccess.Services.Interfaces;
using Fibonacci.Domain.Models;
using LiteDB;

namespace Fibonacci.DataAccess.Services
{

    public class DBService : IDBService
    {
        private LiteDatabase? _db = null;
        private ILiteCollection<FibonacciRequestInfo> _fibonacciRequestsCollection;
        private readonly string DB_DESTINATION_PATH = Directory.GetCurrentDirectory() + Path.DirectorySeparatorChar + "FibonacciRequests.db";
        private const string FIBONACCI_REQUESTS_COLLECTION_NAME = "fibonacciRequests";
        public DBService()
        {
            CheckDbExists();
        }

        private void CheckDbExists()
        {
            try
            {
                _db = new LiteDatabase(DB_DESTINATION_PATH);
            }catch(Exception e)
            {
                Console.WriteLine(e);
                _db = null;
            }
            if( _db != null)
            {
                _fibonacciRequestsCollection = _db.GetCollection<FibonacciRequestInfo>(FIBONACCI_REQUESTS_COLLECTION_NAME);
            }
        }
        public List<FibonacciRequestInfo> GetAllRequestInfos()
        {
            if(_db == null)
            {
                return null;
            }

            var results = _fibonacciRequestsCollection.Query()
                .OrderByDescending(x => x.RequestDate)
                .Select(x => x)
                .ToList();
            return results;
        }

        public bool InsertRequestInfo(FibonacciRequestInfo fibonacciRequest)
        {
            bool wasInserted = false;
            if(_db == null)
            {
                return wasInserted;
            }

            try
            {
                _fibonacciRequestsCollection.Insert(fibonacciRequest);
                wasInserted = true;
            }catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return wasInserted;
        }
    }
}
