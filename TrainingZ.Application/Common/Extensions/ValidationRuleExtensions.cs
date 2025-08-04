using FluentValidation;

namespace TrainingZ.Application.Common.Extensions;

public static class ValidationRuleExtensions
{
    public static IRuleBuilderOptions<T, Guid> MustBeCorrectGuid<T>(this IRuleBuilder<T, Guid> ruleBuilder)
    {
        return ruleBuilder.Must(guid => guid != Guid.Empty).WithMessage("Incorrect id");
    }
}
