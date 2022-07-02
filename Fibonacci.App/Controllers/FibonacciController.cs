using Fibonacci.App.Services.Interfaces;
using Fibonacci.DataAccess.Services;
using Fibonacci.DataAccess.Services.Interfaces;
using Fibonacci.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Fibonacci.App.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FibonacciController : Controller
    {
        private readonly IDBService _db;
        private readonly IFibonacciService _fibonacciService;

        public FibonacciController(IDBService dBService, IFibonacciService fibonacciService)
        {
            _db = dBService;
            _fibonacciService = fibonacciService;
        }

        [HttpGet()]
        public ActionResult<List<FibonacciRequestInfo>> GetRequestInfoHistory()
        {
           var requestInfoList = _db.GetAllRequestInfos();
            if(requestInfoList == null)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
           return StatusCode((int)HttpStatusCode.OK, requestInfoList);
        }

        [HttpPost()]
        public ActionResult<long> CalculateFibonacciNumber(int requestNumber)
        {
            if(requestNumber < 0)
            {
                return BadRequest("Number must be at least 0.");
            }

            var res = _fibonacciService.CalculateFibonacciNumber(requestNumber);
            return StatusCode((int)HttpStatusCode.OK, res);
        }
    }
}
