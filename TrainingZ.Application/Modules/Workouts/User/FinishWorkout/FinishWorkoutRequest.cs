using TrainingZ.Application.Modules.Workouts.Models;
using TrainingZ.Application.Modules.Workouts.User.SaveWorkout;

namespace TrainingZ.Application.Modules.Workouts.User.FinishWorkout;

public record FinishWorkoutRequest(Guid WorkoutId, List<ExerciseProgressDto> Exercises) : SaveWorkoutRequest(WorkoutId, Exercises);