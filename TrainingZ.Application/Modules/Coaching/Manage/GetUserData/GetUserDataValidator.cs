using FluentValidation;

namespace TrainingZ.Application.Modules.Coaching.Manage.GetUserData;

public class GetUserDataValidator : Validator<GetUserDataRequest>
{
    public GetUserDataValidator()
    {
        RuleFor(x => x.Code)
            .NotEmpty()
            .MinimumLength(8);
    }
}
