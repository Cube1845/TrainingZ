using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using TrainingZ.Application.Exceptions;

namespace TrainingZ.Application;

public static class DependencyInjection
{
    public static void AddApplicationDI(this IServiceCollection services)
    {
        services.AddFastEndpoints();

        services.AddExceptionHandler<ExceptionHandler>();
        services.AddProblemDetails();
    }

    public static void UseApplicationDI(this WebApplication app)
    {
        app.UseFastEndpoints(config =>
        {
            config.Endpoints.RoutePrefix = "api";
            config.Errors.ResponseBuilder = (failures, ctx, _) =>
            {
                ctx.Response.ContentType = "application/json";
                return ErrorResponseBuilder.Build(failures);
            };
        });

        app.UseExceptionHandler();
    }
}