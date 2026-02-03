
using Serilog;
using Serilog.Events;


namespace BankifyLogger
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			Directory.CreateDirectory("/app/logs");

			Log.Logger = new LoggerConfiguration()
							 .MinimumLevel.Information()
							 .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
							 .MinimumLevel.Override("System", LogEventLevel.Warning)
							 .WriteTo.File("/app/logs/bankify-.txt", rollingInterval: RollingInterval.Day, outputTemplate: "{Message}{NewLine}")
							 .CreateLogger();


			builder.Host.UseSerilog();

			// Add services to the container.

			builder.Services.AddControllers();

			/*builder.Services.AddCors(options =>
			{
				options.AddPolicy("ReactPolicy", policy =>
				{
					policy
						.SetIsOriginAllowed(origin =>
							origin == "http://localhost:5173" ||    // Local dev
							origin == "http://frontend" ||          // Docker service name
							origin.StartsWith("http://frontend:")  // If port is mapped
						)
						.AllowAnyHeader()
						.AllowAnyMethod();
				});
			});*/

			builder.Services.AddCors(options =>
			{
				options.AddPolicy("ReactPolicy", policy =>
				{
					policy
						.SetIsOriginAllowed(origin =>
							origin.StartsWith("http://localhost") ||          // Local dev
							origin.Contains("compute.amazonaws.com") ||       // EC2 public DNS
							origin.StartsWith("http://13.201.51.77") ||      // EC2 public IP
							origin.StartsWith("http://frontend")             // Docker internal (rare)
						)
						.AllowAnyHeader()
						.AllowAnyMethod();
				});
			});



			/*builder.Services.AddCors(options =>
			{
				options.AddPolicy("ReactPolicy", policy =>
				{
					*//*					policy.WithOrigins("http://localhost:5173")
					*//*
					policy.WithOrigins("http://localhost:5173")
						  .AllowAnyHeader()
						  .AllowAnyMethod();
				});
			});*/
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			/*	builder.Services.AddEndpointsApiExplorer();
				builder.Services.AddSwaggerGen();

				builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
					.AddNegotiate();*/

			/*	builder.Services.AddAuthorization(options =>
				{
					// By default, all incoming requests will be authorized according to the default policy.
					options.FallbackPolicy = options.DefaultPolicy;
				});*/

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			/*if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}*/

			/*app.UseAuthorization();*/
			app.UseCors("ReactPolicy");

			app.MapControllers();

			app.Urls.Add("http://0.0.0.0:5000");

			app.Run();
		}
	}
}
