using TrainingZ.Application.Modules.Coaching.Manage.User.Models;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Application.Modules.Coaching.Manage.User.GetCode;

public record GetUserInfoResponse(string Code, UserInfoDto UserInfo);