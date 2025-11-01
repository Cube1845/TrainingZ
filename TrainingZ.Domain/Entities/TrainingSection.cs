using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class TrainingSection : BaseEntity
{
    public Guid TrainingUnitId { get; set; }
    public TrainingUnit? TrainingUnit { get; set; }
    public int Index { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<Exercise> Exercises { get; set; } = [];

    public TrainingSection() {}

    public TrainingSection(Guid trainingUnitId, int index, string name, DateTime createdAt)
    {
        TrainingUnitId = trainingUnitId;
        Index = index;
        Name = name;
        CreatedAt = createdAt;
    }

    public TrainingSection DeepCopyWithoutInclusions()
    {
        return new TrainingSection()
        {
            Id = Id,
            Index = Index,
            Name = Name,
            Exercises = Exercises.Select(x => x.DeepCopyWithoutInclusions()).ToList(),
        };
    }
}
