using FluentValidation;

namespace TrainingZ.Application.Modules.User.Update.Email;

public class UpdateEmailValidator : Validator<UpdateEmailRequest>
{
    public UpdateEmailValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .MinimumLength(3);
    }
}
