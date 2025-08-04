using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Entities;
using TrainingZ.Domain.Enums;
using TrainingZ.Domain.Services;
using TrainingZ.Infrastructure.Auth.Entites;
using TrainingZ.Infrastructure.Auth.Services;
using TrainingZ.Infrastructure.Persistence;

namespace TrainingZ.Infrastructure.Auth.Endpoints.Register;

public class RegisterEndpoint(AppDbContext context, PasswordHashService passwordHashService, TimeProvider time) : Endpoint<RegisterRequest>
{
    private readonly AppDbContext _context = context;
    private readonly PasswordHashService _passwordHashService = passwordHashService;
    private readonly TimeProvider _time = time;

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

        AppUser appUser = new
        (
            req.Name,
            req.Surname,
            req.Role,
            req.Email,
            passwordHash,
            req.PhoneNumber,
            _time.GetUtcNow().LocalDateTime.ToUniversalTime()
        );

        await _context.AppUsers.AddAsync(appUser, ct);

        if (req.Role == Role.User)
        {
            InvitationData invitationDataDb = new(appUser.Id, _time.GetUtcNow().LocalDateTime.ToUniversalTime()); ;

            while (await _context.InvitationDatas.AnyAsync(x => x.Code == invitationDataDb.Code, ct))
            {
                invitationDataDb.GenerateNewCode();
            }

            await _context.InvitationDatas.AddAsync(invitationDataDb, ct);
        }

        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
