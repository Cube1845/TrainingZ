using TrainingZ.Domain.Enums;

namespace TrainingZ.Infrastructure.Auth.Endpoints.Register;

public record RegisterRequest(string Name, string Surname, string? PhoneNumber, string Email, string Password, Role Role);