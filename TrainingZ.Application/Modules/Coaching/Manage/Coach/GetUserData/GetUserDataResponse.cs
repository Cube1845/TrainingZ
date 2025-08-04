using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Application.Modules.Coaching.Manage.Coach.GetUserData;

public class GetUserDataResponse(IAppUser appUser)
{
    public Guid Id { get; set; } = appUser.Id;
    public string Name { get; set; } = appUser.Name;
    public string Surname { get; set; } = appUser.Surname;
    public Guid? ProfileImageId { get; set; } = appUser.ProfileImageId;
}