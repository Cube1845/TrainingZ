using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Workouts.User.GetCurrentWorkout;

public class GetCurrentWorkoutEndpoint(IAppDbContext context) : EndpointWithoutRequest<Result<GetCurrentWorkoutResponse>>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Get("workouts/current");
        Roles(Role.User.ToString());
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetId();

        var userWorkout = await _context.Workouts
            .Include(x => x.TrainingUnit)
            .ThenInclude(x => x!.TrainingPlan)
            .ThenInclude(x => x!.CoachingData)
            .FirstOrDefaultAsync(x => x.TrainingUnit!.TrainingPlan!.CoachingData!.StudentId == userId && x.IsActive, ct);

        if (userWorkout == null)
        {
            await SendAsync(Result<GetCurrentWorkoutResponse>.Error("You don't have an active workout"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        await SendOkAsync(Result<GetCurrentWorkoutResponse>.Success(new(userWorkout.TrainingUnit!.DeepCopyWithoutInclusions())), ct);
    }
}
