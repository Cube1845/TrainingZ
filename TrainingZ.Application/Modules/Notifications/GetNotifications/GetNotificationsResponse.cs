namespace TrainingZ.Application.Modules.Notifications.GetNotifications;

public record GetNotificationsResponse(List<NotificationDto> Notifications);

public record NotificationDto(Guid Id, string Header, string Message, DateTime CreatedAt);
