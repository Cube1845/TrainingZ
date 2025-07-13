using FluentValidation.Results;
using TrainingZ.Application.Common.Models;

namespace TrainingZ.Application.Exceptions;

public static class ErrorResponseBuilder
{
    public static Result Build(List<ValidationFailure> failures)
    {
        var message = string.Join(" ", failures.Select(x => x.ErrorMessage));
        return Result.Error(message);
    }
}