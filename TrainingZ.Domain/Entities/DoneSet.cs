using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class DoneSet : BaseEntity
{
    public string Comment { get; set; } = string.Empty;
    public int SetIndex { get; set; }
    public bool IsDone { get; set; }
    public Guid DoneExerciseId { get; set; }
    public DoneExercise? DoneExercise { get; set; }

    public DoneSet(string comment, int setIndex, bool isDone, Guid doneExerciseId, DateTime createdAt)
    {
        Comment = comment;
        SetIndex = setIndex;
        IsDone = isDone;
        DoneExerciseId = doneExerciseId;
        CreatedAt = createdAt;
    }
}
