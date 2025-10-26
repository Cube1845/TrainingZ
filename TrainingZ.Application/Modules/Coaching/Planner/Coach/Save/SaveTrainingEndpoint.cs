using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Entities;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.Planner.Coach.Save;

public class SaveTrainingEndpoint(IAppDbContext context, TimeProvider time) : Endpoint<SaveTrainingPlanRequest, Result>
{
    private readonly IAppDbContext _context = context;
    private readonly TimeProvider _time = time;

    public override void Configure()
    {
        Put("coaching/planner");
        Roles(Role.Coach.ToString());
    }

    public override async Task HandleAsync(SaveTrainingPlanRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        var planDb = await _context.TrainingPlans
            .Include(x => x.CoachingData)
            .Include(x => x.TrainingUnits)
            .ThenInclude(x => x.Workouts)
            .ThenInclude(x => x.DoneExercises)
            .Include(x => x.TrainingUnits)
            .ThenInclude(x => x.TrainingSections)
            .ThenInclude(x => x.Exercises)
            .FirstOrDefaultAsync(x => x.Id == req.Plan.Id, ct);

        if (planDb!.CoachingData!.CoachId != userId)
        {
            await SendAsync(Result.Error("You can't edit this plan"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        planDb.Name = req.Plan.Name;
        planDb.IsActive = req.Plan.IsActive;

        await HandleTrainingUnitsDb(req.Plan, planDb, ct);

        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }

    private async Task HandleTrainingUnitsDb(TrainingPlan trainingPlanReq, TrainingPlan trainingPlanDb, CancellationToken ct)
    {
        await CheckForTrainingEnititesToRemove(trainingPlanReq, trainingPlanDb, ct);

        foreach (var unit in trainingPlanReq.TrainingUnits)
        {
            if (unit.Id == Guid.Empty || unit.Id.ToString().Trim() == string.Empty)
            {
                await HandleEmptyIdTrainingUnit(unit, trainingPlanDb.Id, ct);
            }
            else if (trainingPlanDb.TrainingUnits.Any(x => x.Id == unit.Id))
            {
                var unitDb = trainingPlanDb.TrainingUnits.First(x => x.Id == unit.Id);

                await HandleExistingTrainingUnit(unit, unitDb, ct);
            }
        }
    }

    private async Task CheckForTrainingEnititesToRemove(TrainingPlan planReq, TrainingPlan planDb, CancellationToken ct)
    {
        foreach (var unitDb in planDb.TrainingUnits)
        {
            foreach (var sectionDb in unitDb.TrainingSections)
            {
                foreach (var exerciseDb in sectionDb.Exercises)
                {
                    if (planReq.TrainingUnits.All(u => u.TrainingSections.All(s => s.Exercises.All(x => x.Id != exerciseDb.Id))))
                    {
                        _context.Exercises.Remove(exerciseDb);

                        await _context.DoneExercises.Where(x => x.ExerciseId == exerciseDb.Id).ExecuteDeleteAsync(ct);
                    }
                }

                if (planReq.TrainingUnits.All(u => u.TrainingSections.All(x => x.Id != sectionDb.Id)))
                {
                    _context.TrainingSections.Remove(sectionDb);
                }
            }

            if (planReq.TrainingUnits.All(x => x.Id != unitDb.Id))
            {
                _context.TrainingUnits.Remove(unitDb);

                await _context.Workouts.Where(x => x.TrainingUnitId == unitDb.Id).ExecuteDeleteAsync(ct);
                await _context.DoneExercises
                    .Include(x => x.Workout)
                    .Where(x => x.Workout!.TrainingUnitId == unitDb.Id)
                    .ExecuteDeleteAsync(ct);
            }
        }
    }

    private async Task HandleExistingTrainingUnit(TrainingUnit unitReq, TrainingUnit unitDb, CancellationToken ct)
    {
        unitDb.Name = unitReq.Name;

        foreach (var section in unitReq.TrainingSections)
        {
            if (section.Id == Guid.Empty || section.Id.ToString().Trim() == string.Empty)
            {
                await HandleEmptyIdTrainingSection(section, unitDb.Id, ct);
            }
            else if (unitDb.TrainingSections.Any(x => x.Id == section.Id))
            {
                var sectionDb = unitDb.TrainingSections.First(x => x.Id == section.Id);

                await HandleExistingTrainingSection(section, sectionDb, ct);
            }
        }
    }

    private async Task HandleExistingTrainingSection(TrainingSection sectionReq, TrainingSection sectionDb, CancellationToken ct)
    {
        sectionDb.Name = sectionReq.Name;

        foreach (var exercise in sectionReq.Exercises)
        {
            if (exercise.Id == Guid.Empty || exercise.Id.ToString().Trim() == string.Empty)
            {
                await HandleEmptyIdExercise(exercise, sectionDb.Id, ct);
            }
            else if (sectionDb.Exercises.Any(x => x.Id == exercise.Id))
            {
                var exerciseDb = sectionDb.Exercises.First(x => x.Id == sectionReq.Id);

                HandleExistingExercise(exercise, exerciseDb);
            }
        }
    }

    private void HandleExistingExercise(Exercise exerciseReq, Exercise exerciseDb)
    {
        exerciseDb.Index = exerciseReq.Index;
        exerciseDb.ExerciseType = exerciseReq.ExerciseType;
        exerciseDb.Name = exerciseReq.Name;
        exerciseDb.Sets = exerciseReq.Sets;
        exerciseDb.Reps = exerciseReq.Reps;
        exerciseDb.IntensityType = exerciseReq.IntensityType;
        exerciseDb.Intensity = exerciseReq.Intensity;
        exerciseDb.Rest = exerciseReq.Rest;
        exerciseDb.Info = exerciseReq.Info;
    }

    private async Task HandleEmptyIdTrainingUnit(TrainingUnit unitReq, Guid planId, CancellationToken ct)
    {
        TrainingUnit newUnitDb = new(planId, unitReq.Name, _time.GetUtcNow().LocalDateTime.ToUniversalTime());

        await _context.TrainingUnits.AddAsync(newUnitDb, ct);

        foreach (var section in unitReq.TrainingSections)
        {
            await HandleEmptyIdTrainingSection(section, newUnitDb.Id, ct);
        }
    }

    private async Task HandleEmptyIdTrainingSection(TrainingSection sectionReq, Guid unitId, CancellationToken ct)
    {
        TrainingSection newSectionDb = new(unitId, sectionReq.Index, sectionReq.Name, _time.GetUtcNow().LocalDateTime.ToUniversalTime());

        await _context.TrainingSections.AddAsync(newSectionDb, ct);

        foreach (var exercise in sectionReq.Exercises)
        {
            await HandleEmptyIdExercise(exercise, newSectionDb.Id, ct);
        }
    }

    private async Task HandleEmptyIdExercise(Exercise exerciseReq, Guid sectionId, CancellationToken ct)
    {
        Exercise newExerciseDb = new
            (
                sectionId,
                exerciseReq.Index,
                exerciseReq.ExerciseType,
                exerciseReq.Name,
                exerciseReq.Sets,
                exerciseReq.Reps,
                exerciseReq.IntensityType,
                exerciseReq.Intensity,
                exerciseReq.Rest,
                exerciseReq.Info,
                _time.GetUtcNow().LocalDateTime.ToUniversalTime()
            );

        await _context.Exercises.AddAsync(newExerciseDb, ct);
    }
}
