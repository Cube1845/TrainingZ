namespace TrainingZ.Application.Modules.Coaching.General.User.GetCoachData;

public record GetCoachDataResponse(Guid Id, string Name, string Surname, Guid? ProfileImageId, string Email, string? PhoneNumber);