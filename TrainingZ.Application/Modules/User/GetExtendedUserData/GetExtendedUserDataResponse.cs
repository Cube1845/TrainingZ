namespace TrainingZ.Application.Modules.User.GetExtendedUserData;

public record GetExtendedUserDataResponse(Guid Id, string Name, string Surname, Guid? ProfileImageId, string Email, string? PhoneNumber);