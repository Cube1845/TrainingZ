using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.General.Coach.DeleteTrainingPlan;

public class DeleteTrainingPlanEndpoint(IAppDbContext context) : Endpoint<DeleteTrainingPlanRequest, Result>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Delete("coaching/general/plan/{PlanId}");
        Roles(Role.Coach.ToString());
    }

    public override async Task HandleAsync(DeleteTrainingPlanRequest req, CancellationToken ct)
    {
        var planDb = await _context.TrainingPlans
            .Include(x => x.CoachingData)
            .Include(x => x.TrainingUnits)
            .ThenInclude(x => x.Workouts)
            .ThenInclude(x => x.DoneExercises)
            .ThenInclude(x => x.DoneSets)
            .Include(x => x.TrainingUnits)
            .ThenInclude(x => x.TrainingSections)
            .ThenInclude(x => x.Exercises)
            .FirstOrDefaultAsync(x => x.Id == req.PlanId, ct);

        if (planDb == null)
        {
            await SendAsync(Result.Error("Training plan doesn't exist"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        if (planDb.CoachingData!.CoachId != User.GetId())
        {
            await SendAsync(Result.Error("You cant delete this training plan"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        foreach (var unit in planDb.TrainingUnits)
        {
            foreach (var workout in unit.Workouts)
            {
                foreach (var doneExercise in workout.DoneExercises)
                {
                    _context.DoneSets.RemoveRange(doneExercise.DoneSets);
                }

                _context.DoneExercises.RemoveRange(workout.DoneExercises);
            }

            _context.Workouts.RemoveRange(unit.Workouts);

            foreach (var section in unit.TrainingSections)
            {
                _context.Exercises.RemoveRange(section.Exercises);
            }

            _context.TrainingSections.RemoveRange(unit.TrainingSections);
        }

        _context.TrainingUnits.RemoveRange(planDb.TrainingUnits);

        _context.TrainingPlans.Remove(planDb);

        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
