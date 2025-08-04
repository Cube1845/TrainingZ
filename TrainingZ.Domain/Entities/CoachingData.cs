using TrainingZ.Domain.Abstract;

namespace TrainingZ.Domain.Entities;

public class CoachingData : BaseEntity
{
    public CoachingData(Guid coachId, Guid studentId, DateTime createdAt)
    {
        CoachId = coachId;
        StudentId = studentId;
        CreatedAt = createdAt;
    }

    public Guid CoachId { get; set; }
    public Guid StudentId { get; set; }
}