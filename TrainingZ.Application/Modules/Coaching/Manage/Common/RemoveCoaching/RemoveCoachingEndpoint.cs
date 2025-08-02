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

        await _context.CoachingDatas
            .Where(x => x.CoachId == userId || x.StudentId == userId)
            .ExecuteDeleteAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
