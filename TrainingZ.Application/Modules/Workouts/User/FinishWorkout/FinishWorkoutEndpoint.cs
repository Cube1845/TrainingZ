using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Application.Modules.Workouts.Helpers;
using TrainingZ.Application.Modules.Workouts.User.SaveWorkout;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Workouts.User.FinishWorkout;

public class FinishWorkoutEndpoint(IAppDbContext context, TimeProvider time) : Endpoint<SaveWorkoutRequest, Result>
{
    private readonly IAppDbContext _context = context;
    private readonly TimeProvider _time = time;

    public override void Configure()
    {
        Post("workouts/finish");
        Roles(Role.User.ToString());
    }

    public override async Task HandleAsync(SaveWorkoutRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        var workout = await _context.Workouts
            .Include(x => x.DoneExercises)
                .ThenInclude(x => x.DoneSets)
            .Include(x => x.TrainingUnit!)
                .ThenInclude(x => x.TrainingPlan!)
                    .ThenInclude(x => x.CoachingData)
            .FirstOrDefaultAsync(x => x.Id == req.WorkoutId, ct);

        if (workout is null)
        {
            await SendAsync(Result.Error("Workout not found"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        if (workout.TrainingUnit!
            .TrainingPlan!
            .CoachingData!
            .StudentId != userId)
        {
            await SendAsync(Result.Error("Unauthorized"), StatusCodes.Status401Unauthorized, ct);
            return;
        }

        if (!workout.IsActive)
        {
            await SendAsync(Result.Error("Workout already finished"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        TrainingProgressHelper.PersistProgress(workout, req, _time.GetUtcNow().LocalDateTime.ToUniversalTime());

        workout.IsActive = false;
        workout.Finished = _time.GetUtcNow().LocalDateTime.ToUniversalTime();

        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
