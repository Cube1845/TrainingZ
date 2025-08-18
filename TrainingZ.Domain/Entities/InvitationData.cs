using TrainingZ.Domain.Abstract;
using TrainingZ.Domain.Services;

namespace TrainingZ.Domain.Entities;

public class InvitationData : BaseEntity
{
    private readonly int _codeSize = 8;

    public Guid UserId { get; set; }
    public string Code { get; set; }
    public bool HasCoach { get; set; }
    public Guid UserInfoId { get; set; }
    public UserInfo? UserInfo { get; set; }

    public InvitationData(Guid userId, DateTime createdAt, Guid userInfoId)
    {
        UserId = userId;
        Code = CodeService.GenerateCode(_codeSize);
        CreatedAt = createdAt;
        HasCoach = false;
        UserInfoId = userInfoId;
    }

    public void GenerateNewCode()
    {
        Code = CodeService.GenerateCode(_codeSize);
    }
}
