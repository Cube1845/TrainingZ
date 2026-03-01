using FluentValidation;
using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Notifications.SendNotification;

public class SendNotificationValidator : Validator<SendNotificationRequest>
{
    public SendNotificationValidator()
    {
        RuleFor(x => x.ReceiverId)
            .NotNull()
            .MustBeCorrectGuid();

        RuleFor(x => x.Message)
            .NotEmpty()
            .MaximumLength(600);
    }
}
