namespace TrainingZ.Application.Modules.Workouts.Models;

public class ExerciseProgressDto
{
    public Guid ExerciseId { get; set; }
    public List<SetProgressDto> Sets { get; set; } = [];
}
