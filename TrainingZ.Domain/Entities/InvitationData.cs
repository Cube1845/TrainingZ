using TrainingZ.Domain.Abstract;
using TrainingZ.Domain.Services;

namespace TrainingZ.Domain.Entities;

public class InvitationData : BaseEntity
{
    public Guid UserId { get; set; }
    public string Code { get; set; }
    public bool HasCoach { get; set; }

    public InvitationData(Guid userId, DateTime createdAt)
    {
        UserId = userId;
        Code = CodeService.GenerateCode(8);
        CreatedAt = createdAt;
        HasCoach = false;
    }
}
