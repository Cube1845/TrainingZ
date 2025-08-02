namespace TrainingZ.Application.Modules.Coaching.Manage.Coach.GetUserData;

public class GetUserDataRequest
{
    [QueryParam]
    public string Code { get; set; } = string.Empty;
}