namespace TrainingZ.Application.Modules.Coaching.Manage.GetUserData;

public class GetUserDataRequest
{
    [QueryParam]
    public string Code { get; set; } = string.Empty;
}