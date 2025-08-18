namespace TrainingZ.Domain.Models;

public class UserInfo(string goals, string sleepDiet, string activity, string injuries, string timeAvaiable, string other)
{
    public string Goals { get; set; } = goals;
    public string SleepDiet { get; set; } = sleepDiet;
    public string Activity { get; set; } = activity;
    public string Injuries { get; set; } = injuries;
    public string TimeAvaiable { get; set; } = timeAvaiable;
    public string Other { get; set; } = other;
}
