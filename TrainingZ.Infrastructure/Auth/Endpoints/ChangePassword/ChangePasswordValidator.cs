using FastEndpoints;
using FluentValidation;

namespace TrainingZ.Infrastructure.Auth.Endpoints.ChangePassword;

public class ChangePasswordValidator : Validator<ChangePasswordRequest>
{
    public ChangePasswordValidator()
    {
        RuleFor(x => x.OldPassword)
            .NotEmpty()
            .MinimumLength(6);

        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .MinimumLength(6);
    }
}
