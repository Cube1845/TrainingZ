namespace TrainingZ.Application.Modules.User.GetUserData;

public record GetUserDataResponse(Guid Id, string Name, string Surname, Guid? ProfileImageId);