namespace TrainingZ.Application.Modules.Workouts.Models;

public class SetProgressDto
{
    public int Index { get; set; }
    public bool Done { get; set; }
    public string Comment { get; set; } = string.Empty;
}