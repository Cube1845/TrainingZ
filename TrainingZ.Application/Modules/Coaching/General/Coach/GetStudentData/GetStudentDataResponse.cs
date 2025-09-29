namespace TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData;

public record GetStudentDataResponse(Guid Id, string Name, string Surname, Guid? ProfileImageId, string? PhoneNumber, string Email);