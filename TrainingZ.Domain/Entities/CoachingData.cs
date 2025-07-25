using TrainingZ.Domain.Abstract;
using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Domain.Entities;

public class CoachingData : BaseEntity
{
    public CoachingData(Guid coachId, Guid studentId, DateTime now)
    {
        CoachId = coachId;
        StudentId = studentId;
        CreatedAt = now;
    }

    public Guid CoachId { get; set; }
    public IAppUser Coach { get; set; } = default!;
    public Guid StudentId { get; set; }
    public IAppUser Student { get; set; } = default!;
}