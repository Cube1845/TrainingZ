using TrainingZ.Domain.Abstract;
using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Domain.Entities;

public class Invitation : BaseEntity
{
    public Invitation(string code, Guid coachId, Guid? studentId, DateTime now)
    {
        Code = code; // change to generate
        CoachId = coachId;
        StudentId = studentId;
        CreatedAt = now;
    }

    public string Code { get; set; }
    public Guid CoachId { get; set; }
    public IAppUser Coach { get; set; } = default!;
    public Guid? StudentId { get; set; }
    public IAppUser Student { get; set; } = default!;
}
