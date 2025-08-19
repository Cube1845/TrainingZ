using FluentValidation;

namespace TrainingZ.Application.Modules.User.Update.Name;

public class UpdateNameValidator : Validator<UpdateNameRequest>
{
    public UpdateNameValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MinimumLength(2)
            .MaximumLength(16);

        RuleFor(x => x.Surname)
            .NotEmpty()
            .MinimumLength(2)
            .MaximumLength(16);
    }
}
