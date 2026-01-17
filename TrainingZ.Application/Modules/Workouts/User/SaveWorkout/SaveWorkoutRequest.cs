using TrainingZ.Application.Modules.Workouts.Models;

namespace TrainingZ.Application.Modules.Workouts.User.SaveWorkout;

public record SaveWorkoutRequest(Guid WorkoutId, List<ExerciseProgressDto> Exercises);