using TrainingZ.Application.Modules.Common.Models;

namespace TrainingZ.Application.Modules.Coaching.Manage.GetUserData;

public record GetUserDataResponse(string name, string surname, Guid id, Guid profileImageId)
    : UserData(name, surname, id, profileImageId);