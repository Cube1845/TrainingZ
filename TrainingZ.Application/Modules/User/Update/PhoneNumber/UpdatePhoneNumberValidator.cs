using FluentValidation;

namespace TrainingZ.Application.Modules.User.Update.PhoneNumber;

public class UpdatePhoneNumberValidator : Validator<UpdatePhoneNumberRequest>
{
    public UpdatePhoneNumberValidator()
    {
        RuleFor(x => x.PhoneNumber)
            .Must(x => x == null || (x.Length >= 9 && x.Length <= 13));
    }
}
