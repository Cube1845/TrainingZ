using System.Xml.Linq;
using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class TrainingUnit : BaseEntity
{
    public Guid TrainingPlanId { get; set; }
    public TrainingPlan? TrainingPlan { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<TrainingSection> TrainingSections { get; set; } = [];
    public ICollection<Workout> Workouts { get; set; } = [];

    public TrainingUnit() {}

    public TrainingUnit(Guid trainingPlanId, string name, DateTime createdAt)
    {
        TrainingPlanId = trainingPlanId;
        Name = name;
        CreatedAt = createdAt;
    }

    public TrainingUnit DeepCopyWithoutInclusions()
    {
        return new TrainingUnit()
        {
            Id = Id,
            CreatedAt = CreatedAt,
            Name = Name,
            TrainingSections = TrainingSections.Select(x => x.DeepCopyWithoutInclusions()).ToList()
        };
    }
}
