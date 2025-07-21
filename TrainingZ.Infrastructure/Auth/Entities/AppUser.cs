using TrainingZ.Application.Common.Models;

namespace TrainingZ.Infrastructure.Auth.Entities;

public class AppUser(string name, string surname, Role role, string email, string passwordHash, string? phoneNumber)
{
    public Guid Id { get; set; }
    public string Name { get; set; } = name;
    public string Surname { get; set; } = surname;
    public string? PhoneNumber { get; set; } = phoneNumber;
    public Guid? ProfileImageId { get; set; } = null;
    public string Email { get; set; } = email;
    public string PasswordHash { get; set; } = passwordHash;
    public Role Role { get; set; } = role;
    public ICollection<RefreshToken> RefreshTokens { get; set; } = [];
}
