using FluentValidation;
using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Notifications.DeleteNotification;

public class DeleteNotificationValidator : Validator<DeleteNotificationRequest>
{
    public DeleteNotificationValidator()
    {
        RuleFor(x => x.NotificationId)
            .NotNull()
            .MustBeCorrectGuid();
    }
}
