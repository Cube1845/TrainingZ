namespace TrainingZ.Application.Modules.Notifications.SendNotification;

public record SendNotificationRequest(Guid ReceiverId, string Message);
