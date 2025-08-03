using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;

namespace TrainingZ.Application.Modules.Coaching.General.Coach.GetStudents;

public class GetStudentsEndpoint(IAppDbContext context, IAppUserRepository appUserRepo) : EndpointWithoutRequest<Result<GetStudentsResponse>>
{
    private readonly IAppDbContext _context = context;
    private readonly IAppUserRepository _appUserRepo = appUserRepo;

    public override void Configure()
    {
        Get("coaching/general/students");
        // role Coach
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetId();

        var studentIds = await _context.CoachingDatas
            .Where(x => x.CoachId == userId)
            .Select(x => x.StudentId)
            .ToListAsync(ct);

        var studentDatas = await _appUserRepo.GetAppUsers(studentIds, ct);

        await SendOkAsync(Result<GetStudentsResponse>.Success(new(studentDatas)), ct);
    }
}