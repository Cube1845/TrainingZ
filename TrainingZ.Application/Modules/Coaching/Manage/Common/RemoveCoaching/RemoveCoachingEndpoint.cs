using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;

namespace TrainingZ.Application.Modules.Coaching.Manage.Common.RemoveCoaching;

public class RemoveCoachingEndpoint(IAppDbContext context) : EndpointWithoutRequest<Result>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Delete("coaching/manage");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetId();

        var coachingData = await _context.CoachingDatas
            .FirstOrDefaultAsync(x => x.CoachId == userId || x.StudentId == userId, ct);

        if (coachingData == null)
        {
            await SendAsync(Result.Error("Invalid user"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        var invitationData = await _context.InvitationDatas.FirstAsync(x => x.UserId == coachingData.StudentId, ct);

        invitationData.HasCoach = false;

        do
        {
            invitationData.GenerateNewCode();
        }
        while (await _context.InvitationDatas.AnyAsync(x => x.Code == invitationData.Code, ct));

        _context.CoachingDatas.Remove(coachingData);

        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
