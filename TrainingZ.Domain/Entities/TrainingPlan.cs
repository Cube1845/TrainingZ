using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class TrainingPlan : BaseEntity
{
    public Guid CoachingDataId { get; set; }
    public CoachingData? CoachingData { get; set; }
    public DateTime LastModified { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
    public ICollection<TrainingUnit> TrainingUnits { get; set; } = [];

    public TrainingPlan(Guid coachingDataId, DateTime lastModified, string name, bool isActive, DateTime createdAt)
    {
        CoachingDataId = coachingDataId;
        LastModified = lastModified;
        Name = name;
        CreatedAt = createdAt;
        IsActive = isActive;
    }
}
