using TrainingZ.Application.Modules.Workouts.Models;

namespace TrainingZ.Application.Modules.Workouts.User.FinishWorkout;

public record FinishWorkoutRequest(Guid WorkoutId, List<ExerciseProgressDto> Exercises);