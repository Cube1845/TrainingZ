using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Workouts.User.GetWorkoutHistory;

public class GetWorkoutHistoryEndpoint(IAppDbContext context) : EndpointWithoutRequest<Result<GetWorkoutHistoryResponse>>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Get("workouts/history");
        Roles(Role.User.ToString());
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetId();

        var workouts = await _context.Workouts
            .Include(x => x.TrainingUnit)
                .ThenInclude(x => x!.TrainingPlan)
                    .ThenInclude(x => x!.CoachingData)
            .Where(x =>
                x.TrainingUnit!.TrainingPlan!.CoachingData!.StudentId == userId &&
                !x.IsActive &&
                x.Finished != null
            )
            .OrderByDescending(x => x.Finished)
            .Select(x => new LastWorkoutData(
                x.Id,
                x.TrainingUnit!.TrainingPlan!.Name,
                x.TrainingUnit.Name,
                x.Finished!.Value
            ))
            .ToListAsync(ct);

        await SendOkAsync(Result<GetWorkoutHistoryResponse>.Success(new(workouts)), ct);
    }
}