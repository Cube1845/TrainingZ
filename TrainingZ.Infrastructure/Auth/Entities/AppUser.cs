using TrainingZ.Application.Common.Models;

namespace TrainingZ.Infrastructure.Auth.Entities;

public class AppUser(string email = "", string passwordHash = "", Role role = Role.User)
{
    public Guid Id { get; set; }
    public string Email { get; set; } = email;
    public string PasswordHash { get; set; } = passwordHash;
    public Role Role { get; set; } = role;
    public ICollection<RefreshToken> RefreshTokens { get; set; } = [];
}
