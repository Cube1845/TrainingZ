using FluentValidation;
using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Coaching.Manage.AddNewCoaching;

public class AddNewCoachingValidator : Validator<AddNewCoachingRequest>
{
    public AddNewCoachingValidator()
    {
        RuleFor(x => x.UserId)
            .NotNull()
            .MustBeCorrectGuid();
    }
}