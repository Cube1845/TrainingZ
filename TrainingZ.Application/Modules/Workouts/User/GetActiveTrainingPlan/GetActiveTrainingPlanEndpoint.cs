using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Workouts.User.GetActiveTrainingPlan;

public class GetActiveTrainingPlanEndpoint(IAppDbContext context) : EndpointWithoutRequest<Result<GetActiveTrainingPlanResponse>>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Get("workouts/plan");
        Roles(Role.User.ToString());
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetId();

        var activePlanDb = await _context.TrainingPlans
            .Include(x => x.CoachingData)
            .Include(x => x.TrainingUnits)
            .ThenInclude(x => x.TrainingSections)
            .ThenInclude(x => x.Exercises)
            .Where(x => x.CoachingData!.StudentId == userId)
            .FirstOrDefaultAsync(x => x.IsActive, ct);

        if (activePlanDb == null)
        {
            await SendAsync(Result<GetActiveTrainingPlanResponse>.Error("You don't have an active training plan"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        await SendOkAsync(Result<GetActiveTrainingPlanResponse>.Success(new(activePlanDb.DeepCopyWithoutInclusions())), ct);
    }
}
