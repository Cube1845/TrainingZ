using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using TrainingZ.Application.Common.Models;

namespace TrainingZ.Application.Exceptions;

public sealed class ExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken ct)
    {
        if (exception.GetType() != typeof(ValidationException))
        {
            return false;
        }

        httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        httpContext.Response.ContentType = "application/json";

        Result result = Result.Error(exception.Message);

        await httpContext.Response
            .WriteAsJsonAsync(result, ct);

        return true;
    }
}
