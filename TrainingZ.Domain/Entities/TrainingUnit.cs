using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class TrainingUnit : BaseEntity
{
    public Guid TrainingPlanId { get; set; }
    public TrainingPlan? TrainingPlan { get; set; }
    public string Name { get; set; }
    public ICollection<TrainingSection> TrainingSections { get; set; } = [];

    public TrainingUnit(Guid trainingPlanId, string name, DateTime createdAt)
    {
        TrainingPlanId = trainingPlanId;
        Name = name;
        CreatedAt = createdAt;
    }
}
