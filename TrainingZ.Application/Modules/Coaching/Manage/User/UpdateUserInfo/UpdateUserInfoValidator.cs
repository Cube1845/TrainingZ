using FluentValidation;

namespace TrainingZ.Application.Modules.Coaching.Manage.User.UpdateUserInfo;

public class UpdateUserInfoValidator : Validator<UpdateUserInfoRequest>
{
    public UpdateUserInfoValidator()
    {
        RuleFor(x => x.Goals)
            .MaximumLength(256);

        RuleFor(x => x.SleepDiet)
            .MaximumLength(256);

        RuleFor(x => x.Activity)
            .MaximumLength(256);

        RuleFor(x => x.Injuries)
            .MaximumLength(256);

        RuleFor(x => x.TimeAvaiable)
            .MaximumLength(256);

        RuleFor(x => x.Other)
            .MaximumLength(256);
    }
}
