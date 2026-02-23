namespace TrainingZ.Application.Modules.Workouts.User.GetWorkoutDetails;

public record GetWorkoutDetailsResponse(
    Guid Id,
    string PlanName,
    string UnitName,
    DateTime? FinishedAt,
    List<WorkoutExerciseDetailsDto> Exercises
);

public record WorkoutExerciseDetailsDto(
    Guid ExerciseId,
    string ExerciseName,
    List<WorkoutSetDetailsDto> Sets
);

public record WorkoutSetDetailsDto(
    int Index,
    bool Done,
    string Comment
);