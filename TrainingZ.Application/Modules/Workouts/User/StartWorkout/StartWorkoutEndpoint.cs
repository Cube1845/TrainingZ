using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Entities;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Workouts.User.StartWorkout;

public class StartWorkoutEndpoint(IAppDbContext context, TimeProvider time) : Endpoint<StartWorkoutRequest, Result<StartWorkoutResponse>>
{
    private readonly IAppDbContext _context = context;
    private readonly TimeProvider _time = time;

    public override void Configure()
    {
        Post("workouts/start");
        Roles(Role.User.ToString());
    }

    public override async Task HandleAsync(StartWorkoutRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        var userTrainingPlan = await _context.CoachingDatas
            .Include(x => x.TrainingPlans)
            .ThenInclude(x => x.TrainingUnits)
            .Where(x => x.StudentId == userId)
            .SelectMany(x => x.TrainingPlans)
            .FirstOrDefaultAsync(x => x.IsActive, ct);

        if (userTrainingPlan == null)
        {
            await SendAsync(Result<StartWorkoutResponse>.Error("You don't have an active training plan"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        if (!userTrainingPlan.TrainingUnits.Any(x => x.Id == req.TrainingUnitId))
        {
            await SendAsync(Result<StartWorkoutResponse>.Error("Invalid unit id"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        Workout workoutDb = new(req.TrainingUnitId, null, true, _time.GetLocalNow().Date.ToUniversalTime());

        await _context.Workouts.AddAsync(workoutDb, ct);
        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result<StartWorkoutResponse>.Success(new(workoutDb.Id)), ct);
    }
}