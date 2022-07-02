using Fibonacci.App.Services;
using Fibonacci.App.Services.Interfaces;
using Fibonacci.DataAccess.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddSwaggerDocument(settings =>
{
    settings.PostProcess = document =>
    {
        document.Info = new NSwag.OpenApiInfo();
    };
});
builder.Services.AddDataAccessServices();
builder.Services.AddSingleton<IFibonacciService, FibonacciService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
} else
{
    app.UseOpenApi();
    app.UseSwaggerUi3();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllers();
app.MapFallbackToFile("index.html"); ;

app.Run();
