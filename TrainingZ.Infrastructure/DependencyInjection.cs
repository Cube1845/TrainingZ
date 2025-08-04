using FastEndpoints.Security;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Infrastructure.Auth.Config;
using TrainingZ.Infrastructure.Auth.Services;
using TrainingZ.Infrastructure.Persistence;
using TrainingZ.Infrastructure.Persistence.Repositories;

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
            .AddAuthenticationJwtBearer(
                s => 
                    s.SigningKey = configuration["JwtSettings:SecretKey"]!, 
                o => 
                    o.TokenValidationParameters.RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            )
            .AddAuthorization();

        services.Configure<JwtCreationOptions>(o => o.SigningKey = configuration["JwtSettings:SecretKey"]!);

        services.AddScoped<IAppUserRepository, AppUserRepository>();
    }

    public static void UseInfrastructureDI(this WebApplication app)
    {
        app
            .UseAuthentication()
            .UseAuthorization();
    }
}