using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Models;
using TrainingZ.Infrastructure.Auth.Entities;
using TrainingZ.Infrastructure.Auth.Services;
using TrainingZ.Infrastructure.Persistence;

namespace TrainingZ.Infrastructure.Auth.Endpoints.Register;

public class RegisterEndpoint(AppDbContext context, PasswordHashService passwordHashService) : Endpoint<RegisterRequest>
{
    private readonly AppDbContext _context = context;
    private readonly PasswordHashService _passwordHashService = passwordHashService;

    public override void Configure()
    {
        Post("auth/register");
        AllowAnonymous();
    }

    public override async Task HandleAsync(RegisterRequest req, CancellationToken ct)
    {
        if (await _context.AppUsers.AnyAsync(user => user.Email == req.Email, ct))
        {
            await SendOkAsync(Result.Error("An account with this email already exist"), ct);
            return;
        }

        var passwordHash = _passwordHashService.HashPaswordWithSalt(req.Password);

        AppUser appUser = new(req.Name, req.Surname, req.Role, req.Email, passwordHash, req.PhoneNumber);
        await _context.AppUsers.AddAsync(appUser, ct);

        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
