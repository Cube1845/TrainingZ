using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.Manage.Coach.GetUserData;

public class GetUserDataEndpoint(IAppUserRepository appUserRepo, IAppDbContext context) : Endpoint<GetUserDataRequest, Result<GetUserDataResponse>>
{
    private readonly IAppUserRepository _appUserRepo = appUserRepo;
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Get("coaching/manage");
        Roles(Role.Coach.ToString());
    }

    public override async Task HandleAsync(GetUserDataRequest req, CancellationToken ct)
    {
        var invitationDataDb = await _context.InvitationDatas
            .FirstOrDefaultAsync(x => x.Code == req.Code, ct);

        if (invitationDataDb == null || invitationDataDb.HasCoach)
        {
            await SendAsync(Result<GetUserDataResponse>.Error("Invalid code"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        var appUser = await _appUserRepo.GetAppUser(invitationDataDb.UserId, ct);

        if (appUser == null)
        {
            await SendAsync(Result<GetUserDataResponse>.Error("Invalid code"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        await SendOkAsync(Result<GetUserDataResponse>.Success(new(appUser)), ct);
    }
}