using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TrainingZ.Infrastructure.Persistence;

namespace TrainingZ.Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructureDI(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("Postgres")));
    }

    public static void UseInfrastructureDI(this WebApplication app)
    {

    }
}