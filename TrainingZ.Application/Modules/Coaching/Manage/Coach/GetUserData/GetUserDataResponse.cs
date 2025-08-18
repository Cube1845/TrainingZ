using TrainingZ.Application.Modules.Coaching.Manage.User.Models;
using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Application.Modules.Coaching.Manage.Coach.GetUserData;

public class GetUserDataResponse(IAppUser appUser, UserInfoDto userInfo)
{
    public IAppUser UserData { get; set; } = appUser;
    public UserInfoDto UserInfo { get; set; } = userInfo;
}