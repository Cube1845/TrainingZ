using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Workouts.User.GetWorkoutDetails;

public class GetWorkoutDetailsEndpoint(IAppDbContext context)
    : Endpoint<GetWorkoutDetailsRequest, Result<GetWorkoutDetailsResponse>>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Get("workouts/details/{Id}");
        Roles(Role.User.ToString());
    }

    public override async Task HandleAsync(GetWorkoutDetailsRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        var workout = await _context.Workouts
            .Include(w => w.TrainingUnit)
                .ThenInclude(u => u!.TrainingPlan)
                    .ThenInclude(p => p!.CoachingData)
            .Include(w => w.DoneExercises)
                .ThenInclude(de => de.DoneSets)
            .FirstOrDefaultAsync(w =>
                w.Id == req.Id &&
                w.TrainingUnit!.TrainingPlan!.CoachingData!.StudentId == userId,
                ct
            );

        if (workout is null)
        {
            await SendAsync(
                Result<GetWorkoutDetailsResponse>.Error("Workout not found"),
                StatusCodes.Status404NotFound,
                ct
            );
            return;
        }

        var exerciseLookup = workout.TrainingUnit!
            .TrainingSections
            .SelectMany(s => s.Exercises)
            .ToDictionary(e => e.Id, e => e.Name);

        var response = new GetWorkoutDetailsResponse(
            workout.Id,
            workout.TrainingUnit!.TrainingPlan!.Name,
            workout.TrainingUnit.Name,
            workout.Finished,
            workout.DoneExercises
                .OrderBy(de => de.CreatedAt)
                .Select(de => new WorkoutExerciseDetailsDto(
                    de.ExerciseId,
                    exerciseLookup.TryGetValue(de.ExerciseId, out var name)
                        ? name
                        : "Deleted exercise",
                    de.DoneSets
                        .OrderBy(ds => ds.SetIndex)
                        .Select(ds => new WorkoutSetDetailsDto(
                            ds.SetIndex,
                            ds.IsDone,
                            ds.Comment
                        ))
                        .ToList()
                ))
                .ToList()
        );

        await SendOkAsync(Result<GetWorkoutDetailsResponse>.Success(response), ct);
    }
}