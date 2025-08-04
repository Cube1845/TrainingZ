using FastEndpoints.Security;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Infrastructure.Auth.Endpoints.Login;

public class LoginResponse : TokenResponse
{
    public DateTime AccessExpiryDateTime => AccessExpiry.ToLocalTime();
    public DateTime RefreshExpiryDateTime => RefreshExpiry.ToLocalTime();
    public Role Role { get; set; }
}
