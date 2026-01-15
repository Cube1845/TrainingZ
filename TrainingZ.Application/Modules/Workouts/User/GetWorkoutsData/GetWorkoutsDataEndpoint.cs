using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Workouts.User.GetWorkoutsData;

public class GetWorkoutsDataEndpoint(IAppDbContext context) : EndpointWithoutRequest<Result<GetWorkoutsDataResponse>>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Get("workouts/workouts-data");
        Roles(Role.User.ToString());
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetId();

        var userTrainingPlans = await _context.TrainingPlans
            .Include(x => x.CoachingData)
            .Include(x => x.TrainingUnits)
            .ThenInclude(x => x.Workouts)
            .Where(x => x.CoachingData!.StudentId == userId)
            .ToListAsync(ct);

        var hasCurrentWorkout = userTrainingPlans.Any(p => p.TrainingUnits.Any(u => u.Workouts.Any(w => w.IsActive)));

        var lastWorkouts = await _context.Workouts
            .Include(x => x.TrainingUnit)
            .ThenInclude(x => x!.TrainingPlan)
            .ThenInclude(x => x!.CoachingData)
            .Where(x => x.TrainingUnit!.TrainingPlan!.CoachingData!.StudentId == userId)
            .OrderByDescending(x => x.Finished)
            .Take(3)
            .Select(x => new LastWorkoutData(x.Id, x.TrainingUnit!.TrainingPlan!.Name, x.TrainingUnit.Name, x.CreatedAt))
            .ToListAsync(ct);

        await SendOkAsync(Result<GetWorkoutsDataResponse>.Success(new(hasCurrentWorkout, userTrainingPlans.Any(x => x.IsActive), lastWorkouts)), ct);
    }
}
