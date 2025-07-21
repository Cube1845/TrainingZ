using FastEndpoints;
using FluentValidation;

namespace TrainingZ.Infrastructure.Auth.Endpoints.Register;

public class RegisterValidator : Validator<RegisterRequest>
{
    public RegisterValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .MinimumLength(3);

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(6);

        RuleFor(x => x.Role)
            .NotNull();

        RuleFor(x => x.Name)
            .NotEmpty()
            .MinimumLength(2);

        RuleFor(x => x.Surname)
            .NotEmpty()
            .MinimumLength(2);

        RuleFor(x => x.PhoneNumber)
            .Length(9);
    }
}
