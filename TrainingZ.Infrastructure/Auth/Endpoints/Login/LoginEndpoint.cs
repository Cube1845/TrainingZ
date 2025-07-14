using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TrainingZ.Infrastructure.Auth.Entities;
using TrainingZ.Infrastructure.Auth.Services;
using TrainingZ.Infrastructure.Persistence;

namespace TrainingZ.Infrastructure.Auth.Endpoints.Login;

public class LoginEndpoint(AppDbContext context, PasswordHashService passwordHashService) : Endpoint<LoginRequest, LoginResponse>
{
    private readonly AppDbContext _context = context;
    private readonly PasswordHashService _passwordHashService = passwordHashService;

    public override void Configure()
    {
        Post("auth/login");
        AllowAnonymous();
    }

    public override async Task HandleAsync(LoginRequest req, CancellationToken ct)
    {
        var user = await _context.AppUsers.FirstOrDefaultAsync(user => user.Email == req.Email, ct);

        if (!_passwordHashService.VerifyPassword(req.Password, user!.PasswordHash) || user == null)
        {
            ThrowError("Incorrect email or password");
            return;
        }

        var response = await CreateTokenWith<TokenService>(user.Id.ToString(), u =>
        {
            u.Claims.Add(new(ClaimTypes.NameIdentifier, user.Id.ToString()));
            u.Claims.Add(new(ClaimTypes.Role, user.Role.ToString()));
        });

        response.Role = user.Role;

        Response = response;
    }
}
