using TrainingZ.Domain.Abstract;

namespace TrainingZ.Infrastructure.Auth.Entities;

public class RefreshToken : BaseEntity
{
    public RefreshToken(Guid ownerId, string token, DateTime expiryDate, DateTime now)
    {
        OwnerId = ownerId;
        Token = token;
        ExpiryDate = expiryDate;
        CreatedAt = now;
    }

    public Guid OwnerId { get; set; }
    public string Token { get; set; }
    public DateTime ExpiryDate { get; set; }
    public AppUser? Owner { get; set; }

    public bool IsExpired(DateTime now)
    {
        return ExpiryDate <= now;
    }
}
