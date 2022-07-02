

namespace Fibonacci.Domain.Models
{
    public class FibonacciRequestInfo
    {
        public int RequestedNumber { get; set; }
        public DateTime RequestDate { get; set; }
        public long ResultNumber { get; set; }
    }
}
