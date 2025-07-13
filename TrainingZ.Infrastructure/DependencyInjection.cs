using FastEndpoints.Security;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Infrastructure.Auth.Config;
using TrainingZ.Infrastructure.Auth.Services;
using TrainingZ.Infrastructure.Persistence;

namespace TrainingZ.Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructureDI(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("Postgres")));

        services.Configure<TokenOptions>(configuration.GetSection(TokenOptions.Jwt));

        services.AddScoped<IAppDbContext, AppDbContext>();

        services.AddScoped<PasswordHashService>();
        services.AddScoped<TokenService>();
        services.AddScoped<TokenConfiguration>();

        services
            .AddAuthenticationJwtBearer(s => s.SigningKey = configuration["JwtSettings:SecretKey"]!)
            .AddAuthorization();

        services.Configure<JwtCreationOptions>(o => o.SigningKey = configuration["JwtSettings:SecretKey"]!);
    }

    public static void UseInfrastructureDI(this WebApplication app)
    {
        app
            .UseAuthentication()
            .UseAuthorization();
    }
}