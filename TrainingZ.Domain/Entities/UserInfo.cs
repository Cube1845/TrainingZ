using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class UserInfo : BaseEntity
{
    public string Goals { get; set; }
    public string SleepDiet { get; set; }
    public string Activity { get; set; }
    public string Injuries { get; set; }
    public string TimeAvaiable { get; set; }
    public string Other { get; set; }
    public InvitationData? InvitationData { get; set; }

    public UserInfo(DateTime createdAt, string goals, string sleepDiet, string activity, string injuries, string timeAvaiable, string other)
    {
        Goals = goals;
        SleepDiet = sleepDiet;
        Activity = activity;
        Injuries = injuries;
        TimeAvaiable = timeAvaiable;
        Other = other;
        CreatedAt = createdAt;
    }
}
