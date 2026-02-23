using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class DoneExercise : BaseEntity
{
    public Guid WorkoutId { get; set; }
    public Workout? Workout { get; set; }
    public Guid ExerciseId { get; set; }
    public ICollection<DoneSet> DoneSets { get; set; } = [];

    public DoneExercise(Guid workoutId, Guid exerciseId, DateTime createdAt)
    {
        ExerciseId = exerciseId;
        WorkoutId = workoutId;
        CreatedAt = createdAt;
    }
}
