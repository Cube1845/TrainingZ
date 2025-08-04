using TrainingZ.Domain.Abstract;
using TrainingZ.Domain.Enums;
using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Infrastructure.Auth.Entites;

public class AppUser : BaseEntity, IExtendedAppUser
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string? PhoneNumber { get; set; }
    public Guid? ProfileImageId { get; set; } = null;
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public Role Role { get; set; }
    public ICollection<RefreshToken> RefreshTokens { get; set; } = [];

    public AppUser(string name, string surname, Role role, string email, string passwordHash, string? phoneNumber, DateTime createdAt)
    {
        Name = name;
        Surname = surname;
        PhoneNumber = phoneNumber;
        Email = email;
        PasswordHash = passwordHash;
        Role = role;
        CreatedAt = createdAt;
    }
}
