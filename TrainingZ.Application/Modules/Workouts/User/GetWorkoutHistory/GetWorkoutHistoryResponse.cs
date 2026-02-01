using TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData.Models;

namespace TrainingZ.Application.Modules.Workouts.User.GetWorkoutHistory;

public record GetWorkoutHistoryResponse(List<LastWorkoutData> Workouts);