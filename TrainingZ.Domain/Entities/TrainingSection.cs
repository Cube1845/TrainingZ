using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class TrainingSection : BaseEntity
{
    public Guid TrainingUnitId { get; set; }
    public TrainingUnit? TrainingUnit { get; set; }
    public string Name { get; set; }
    public ICollection<Exercise> Exercises { get; set; } = [];

    public TrainingSection(Guid trainingUnitId, string name, DateTime createdAt)
    {
        TrainingUnitId = trainingUnitId;
        Name = name;
        CreatedAt = createdAt;
    }
}
