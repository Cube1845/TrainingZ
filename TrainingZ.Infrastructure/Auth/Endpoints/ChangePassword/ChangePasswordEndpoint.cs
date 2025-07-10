using FastEndpoints;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Models;
using TrainingZ.Infrastructure.Auth.Services;
using TrainingZ.Infrastructure.Persistence;

namespace TrainingZ.Infrastructure.Auth.Endpoints.ChangePassword;

public class ChangePasswordEndpoint(AppDbContext context, PasswordHashService passwordHashService) : Endpoint<ChangePasswordRequest, Result>
{
    private readonly AppDbContext _context = context;
    private readonly PasswordHashService _passwordHashService = passwordHashService;

    public override void Configure()
    {
        Put("auth/password");
    }

    public override async Task HandleAsync(ChangePasswordRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        var userDb = await _context.AppUsers.FindAsync([userId], ct);

        if (userDb == null)
        {
            await SendOkAsync(Result.Error("Incorrect data"), ct);
            return;
        }

        var oldPasswordCorrect = _passwordHashService.VerifyPassword(req.OldPassword, userDb!.PasswordHash);

        if (!oldPasswordCorrect)
        {
            await SendOkAsync(Result.Error("Current password incorrect"), ct);
            return;
        }

        if (req.NewPassword == req.OldPassword)
        {
            await SendOkAsync(Result.Error("New password cannot be the same as old"), ct);
            return;
        }

        userDb.PasswordHash = _passwordHashService.HashPaswordWithSalt(req.NewPassword);

        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
