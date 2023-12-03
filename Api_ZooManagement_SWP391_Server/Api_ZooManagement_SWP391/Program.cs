using DAL.Data;
using DAL.Repositories;
using BBL.Interfaces;
using BBL.Services;
using BBL.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using Microsoft.EntityFrameworkCore;
using DAL.Entities;
using DTO.Dtos;
using BLL.Interfaces;
using BLL.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Create Authorization
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ZooManagement"));
});
//Create JWTBearer Require and AddAuthen
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddDbContext<DataContext>();

builder.Services.AddScoped<ICageService, CageService>();
builder.Services.AddScoped<IAreaService, AreaService>();
builder.Services.AddScoped<IFoodService, FoodService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<ITicketService, TicketService>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<IScheduleService, ScheduleService>();
builder.Services.AddScoped<IAnimalService, AnimalService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IVnPayService, VnPayService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IWorkExperienceService, ExperienceService>();
builder.Services.AddScoped<IAnimalScheduleService, AnimalScheduleService>();

builder.Services.AddScoped<IFoodCategoryService, FoodCategoryService>();
builder.Services.AddScoped<IAnimalSpeciesService, AnimalSpeciesService>();
builder.Services.AddScoped<IMealService, MealService>();


builder.Services.AddScoped<IReviewService, ReviewService>();

builder.Services.AddScoped<IGenericRepository<User>, GenericRepository<User>>();
builder.Services.AddScoped<IGenericRepository<Cage>, GenericRepository<Cage>>();
builder.Services.AddScoped<IGenericRepository<Area>, GenericRepository<Area>>();
builder.Services.AddScoped<IGenericRepository<Food>, GenericRepository<Food>>();
builder.Services.AddScoped<IGenericRepository<Order>, GenericRepository<Order>>();
builder.Services.AddScoped<IGenericRepository<Ticket>, GenericRepository<Ticket>>();
builder.Services.AddScoped<IGenericRepository<News>, GenericRepository<News>>();
builder.Services.AddScoped<IGenericRepository<Schedule>, GenericRepository<Schedule>>();
builder.Services.AddScoped<IGenericRepository<Animal>, GenericRepository<Animal>>();
builder.Services.AddScoped<IGenericRepository<WorkExperience>, GenericRepository<WorkExperience>>();
builder.Services.AddScoped<IGenericRepository<ExperienceDetail>, GenericRepository<ExperienceDetail>>();
builder.Services.AddScoped<IGenericRepository<AnimalCage>, GenericRepository<AnimalCage>>();
builder.Services.AddScoped<IGenericRepository<AnimalSchedule>, GenericRepository<AnimalSchedule>>();
builder.Services.AddScoped<IGenericRepository<AnimalTrainer>, GenericRepository<AnimalTrainer>>();
builder.Services.AddScoped<IGenericRepository<OrderTicket>, GenericRepository<OrderTicket>>();
builder.Services.AddScoped<IGenericRepository<GetAnimalDto>, GenericRepository<GetAnimalDto>>();
builder.Services.AddScoped<IGenericRepository<Transaction>, GenericRepository<Transaction>>();
builder.Services.AddScoped<IGenericRepository<AnimalSchedule>, GenericRepository<AnimalSchedule>>();

builder.Services.AddScoped<IGenericRepository<FoodCategory>, GenericRepository<FoodCategory>>();
builder.Services.AddScoped<IGenericRepository<AnimalSpecies>, GenericRepository<AnimalSpecies>>();

builder.Services.AddScoped<IGenericRepository<Review>, GenericRepository<Review>>();
builder.Services.AddScoped<IGenericRepository<Meal>, GenericRepository<Meal>>();
builder.Services.AddScoped<IGenericRepository<FoodMeal>, GenericRepository<FoodMeal>>();
builder.Services.AddScoped<IGenericRepository<AnimalMeal>, GenericRepository<AnimalMeal>>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x
             .AllowAnyMethod()
             .AllowAnyHeader()
             .SetIsOriginAllowed(origin => true) // allow any origin
             .AllowCredentials()); // allow credentials

app.UseHttpsRedirection();
//user Authen
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

