using TrainingZ.Application.Common.Models;

namespace TrainingZ.Infrastructure.Auth.Endpoints.Register;

public record RegisterRequest(string Email, string Password, Role Role);