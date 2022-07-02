using Fibonacci.DataAccess.Services;
using Fibonacci.DataAccess.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fibonacci.DataAccess.Extensions
{
    public static class InitDataAccessExtension
    {
        public static void AddDataAccessServices(this IServiceCollection services)
        {
            services.AddSingleton<IDBService, DBService>();
        }
    }
}
