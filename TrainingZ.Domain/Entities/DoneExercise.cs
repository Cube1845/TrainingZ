using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class DoneExercise : BaseEntity
{
    public Guid WorkoutId { get; set; }
    public Workout? Workout { get; set; }
    public Guid ExerciseId { get; set; }
    public int SetsDone { get; set; }
    public string StudentFeedback { get; set; }

    public DoneExercise(Guid workoutId, Guid exerciseId, int setsDone, string studentFeedback, DateTime createdAt)
    {
        ExerciseId = exerciseId;
        WorkoutId = workoutId;
        SetsDone = setsDone;
        StudentFeedback = studentFeedback;
        CreatedAt = createdAt;
    }
}
