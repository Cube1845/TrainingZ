using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Application.Modules.Coaching.Manage.Coach.AddNewCoaching;

public class AddNewCoachingEndpoint(IAppDbContext context, IAppUserRepository appUserRepo, TimeProvider time) : Endpoint<AddNewCoachingRequest, Result>
{
    private readonly IAppDbContext _context = context;
    private readonly IAppUserRepository _appUserRepo = appUserRepo;
    private readonly TimeProvider _time = time;

    public override void Configure()
    {
        Post("coaching/manage");
        // role Coach
    }

    public override async Task HandleAsync(AddNewCoachingRequest req, CancellationToken ct)
    {
        if (!await _appUserRepo.AppUserExists(req.UserId, ct))
        {
            await SendAsync(Result.Error("User does not exist"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        if (await _context.CoachingDatas.AnyAsync(x => x.StudentId == req.UserId, ct))
        {
            await SendAsync(Result.Error("User is already being coached"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        var coachId = User.GetId();

        CoachingData coachingData = new(coachId, req.UserId, _time.GetUtcNow().LocalDateTime.ToUniversalTime());

        await _context.CoachingDatas.AddAsync(coachingData, ct);

        await _context.InvitationDatas
            .Where(x => x.UserId == req.UserId)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.HasCoach, true), ct);

        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}