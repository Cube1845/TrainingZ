using TrainingZ.Domain.Entities;

namespace TrainingZ.Application.Modules.Coaching.Manage.User.Models;

public record UserInfoDto(string Goals, string SleepDiet, string Activity, string Injuries, string TimeAvaiable, string Other)
{
    public static implicit operator UserInfoDto(UserInfo userInfo)
    {
        UserInfoDto userInfoDto = new
        (
            userInfo.Goals,
            userInfo.SleepDiet,
            userInfo.Activity,
            userInfo.Injuries,
            userInfo.TimeAvaiable,
            userInfo.Other
        );

        return userInfoDto;
    }
}
