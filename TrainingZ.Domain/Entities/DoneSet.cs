using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class DoneSet : BaseEntity
{
    public string Comment { get; set; } = string.Empty;
    public Guid DoneExerciseId { get; set; }
    public DoneExercise? DoneExercise { get; set; }

    public DoneSet(string comment, Guid doneExerciseId, DoneExercise? doneExercise, DateTime createdAt)
    {
        Comment = comment;
        DoneExerciseId = doneExerciseId;
        DoneExercise = doneExercise;
        CreatedAt = createdAt;
    }
}
