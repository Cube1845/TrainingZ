using FastEndpoints.Security;
using TrainingZ.Application.Common.Models;

namespace TrainingZ.Infrastructure.Auth.Endpoints.Login;

public class LoginResponse : TokenResponse
{
    public DateTime AccessExpiryDateTime => AccessExpiry.ToLocalTime();
    public DateTime RefreshExpiryDateTime => RefreshExpiry.ToLocalTime();
    public Role Role { get; set; }
}
