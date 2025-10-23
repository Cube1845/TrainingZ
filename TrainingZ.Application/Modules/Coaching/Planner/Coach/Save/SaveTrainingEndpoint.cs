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

        if (planDb!.CoachingData!.CoachId == userId)
        {
            await SendAsync(Result.Error("You can't edit this plan"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        planDb.Name = req.Plan.Name;
        planDb.IsActive = req.Plan.IsActive;

        foreach (var unit in req.Plan.TrainingUnits)
        {
            if (unit.Id == Guid.Empty || unit.Id.ToString().Trim() == string.Empty)
            {
                TrainingUnit unitDb = new(planDb.Id, unit.Name, _time.GetUtcNow().LocalDateTime.ToUniversalTime());

                await _context.TrainingUnits.AddAsync(unitDb, ct);

                foreach (var section in unit.TrainingSections)
                {
                    TrainingSection sectionDb = new(unitDb.Id, section.Index, section.Name, _time.GetUtcNow().LocalDateTime.ToUniversalTime());

                    await _context.TrainingSections.AddAsync(sectionDb, ct);

                    foreach (var exercise in section.Exercises)
                    {
                        Exercise exerciseDb = new
                        (
                            sectionDb.Id, 
                            exercise.Index,
                            exercise.ExerciseType,
                            exercise.Name,
                            exercise.Sets,
                            exercise.Reps,
                            exercise.IntensityType,
                            exercise.Intensity,
                            exercise.Rest,
                            exercise.Info,
                            _time.GetUtcNow().LocalDateTime.ToUniversalTime()
                        );

                        await _context.Exercises.AddAsync(exerciseDb, ct);
                    }
                }
            }
            else if (planDb.TrainingUnits.Any(x => x.Id == unit.Id))
            {
                var unitDb = planDb.TrainingUnits.First(x => x.Id == unit.Id);

                unitDb.Name = unit.Name;

                foreach (var section in unit.TrainingSections)
                {
                    if (section.Id == Guid.Empty || section.Id.ToString().Trim() == string.Empty)
                    {
                        TrainingSection sectionDb = new(unitDb.Id, section.Index, section.Name, _time.GetUtcNow().LocalDateTime.ToUniversalTime());

                        await _context.TrainingSections.AddAsync(sectionDb, ct);

                        foreach (var exercise in section.Exercises)
                        {
                            Exercise exerciseDb = new
                            (
                                sectionDb.Id,
                                exercise.Index,
                                exercise.ExerciseType,
                                exercise.Name,
                                exercise.Sets,
                                exercise.Reps,
                                exercise.IntensityType,
                                exercise.Intensity,
                                exercise.Rest,
                                exercise.Info,
                                _time.GetUtcNow().LocalDateTime.ToUniversalTime()
                            );

                            await _context.Exercises.AddAsync(exerciseDb, ct);
                        }
                    }
                    else if (unitDb.TrainingSections.Any(x => x.Id == section.Id))
                    {
                        var sectionDb = unitDb.TrainingSections.First(x => x.Id == section.Id);

                        sectionDb.Name = section.Name;

                        foreach (var exercise in section.Exercises)
                        {
                            if (exercise.Id == Guid.Empty || exercise.Id.ToString().Trim() == string.Empty)
                            {
                                Exercise exerciseDb = new
                                (
                                    sectionDb.Id,
                                    exercise.Index,
                                    exercise.ExerciseType,
                                    exercise.Name,
                                    exercise.Sets,
                                    exercise.Reps,
                                    exercise.IntensityType,
                                    exercise.Intensity,
                                    exercise.Rest,
                                    exercise.Info,
                                    _time.GetUtcNow().LocalDateTime.ToUniversalTime()
                                );

                                await _context.Exercises.AddAsync(exerciseDb, ct);
                            }
                            else if (sectionDb.Exercises.Any(x => x.Id == exercise.Id))
                            {
                                var exerciseDb = sectionDb.Exercises.First(x => x.Id == section.Id);

                                exerciseDb.Index = exercise.Index;
                                exerciseDb.ExerciseType = exercise.ExerciseType;
                                exerciseDb.Name = exercise.Name;
                                exerciseDb.Sets = exercise.Sets;
                                exerciseDb.Reps = exercise.Reps;
                                exerciseDb.IntensityType = exercise.IntensityType;
                                exerciseDb.Intensity = exercise.Intensity;
                                exerciseDb.Rest = exercise.Rest;
                                exerciseDb.Info = exercise.Info;
                            }
                        }
                    }
                }
            }
        }

        foreach (var unitDb in planDb.TrainingUnits)
        {
            foreach (var sectionDb in unitDb.TrainingSections)
            {
                foreach (var exerciseDb in sectionDb.Exercises)
                {
                    if (req.Plan.TrainingUnits.All(u => u.TrainingSections.All(s => s.Exercises.All(x => x.Id != exerciseDb.Id))))
                    {
                        _context.Exercises.Remove(exerciseDb);

                        await _context.DoneExercises.Where(x => x.ExerciseId == exerciseDb.Id).ExecuteDeleteAsync(ct);
                    }
                }

                if (req.Plan.TrainingUnits.All(u => u.TrainingSections.All(x => x.Id != sectionDb.Id)))
                {
                    _context.TrainingSections.Remove(sectionDb);
                }
            }

            if (req.Plan.TrainingUnits.All(x => x.Id != unitDb.Id))
            {
                _context.TrainingUnits.Remove(unitDb);

                await _context.Workouts.Where(x => x.TrainingUnitId == unitDb.Id).ExecuteDeleteAsync(ct);
                await _context.DoneExercises.Include(x => x.Workout).Where(x => x.Workout!.TrainingUnitId == unitDb.Id).ExecuteDeleteAsync(ct);
            }
        }

        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
