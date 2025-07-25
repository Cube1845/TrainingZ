using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Abstract;
using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Infrastructure.Auth.Entities;

public class AppUser : BaseEntity, IAppUser
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string? PhoneNumber { get; set; }
    public Guid? ProfileImageId { get; set; } = null;
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public Role Role { get; set; }
    public ICollection<RefreshToken> RefreshTokens { get; set; } = [];

    public AppUser(string name, string surname, Role role, string email, string passwordHash, string? phoneNumber, DateTime now)
    {
        Name = name;
        Surname = surname;
        PhoneNumber = phoneNumber;
        Email = email;
        PasswordHash = passwordHash;
        Role = role;
        CreatedAt = now;
    }
}
