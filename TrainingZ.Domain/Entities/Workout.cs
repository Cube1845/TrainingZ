using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class Workout : BaseEntity
{
    public Guid TrainingUnitId { get; set; }
    public TrainingUnit? TrainingUnit { get; set; }
    public DateTime Finished { get; set; }
    public ICollection<DoneExercise> DoneExercises { get; set; } = [];

    public Workout(Guid trainingUnitId, DateTime finished, ICollection<DoneExercise> doneExercises, DateTime createdAt)
    {
        TrainingUnitId = trainingUnitId;
        Finished = finished;
        DoneExercises = doneExercises;
        CreatedAt = createdAt;
    }
}
