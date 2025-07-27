using TrainingZ.Domain.Abstract;

namespace TrainingZ.Infrastructure.Auth.Entites;

public class RefreshToken : BaseEntity
{
    public RefreshToken(Guid ownerId, string token, DateTime expiryDate, DateTime createdAt)
    {
        OwnerId = ownerId;
        Token = token;
        ExpiryDate = expiryDate;
        CreatedAt = createdAt;
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
