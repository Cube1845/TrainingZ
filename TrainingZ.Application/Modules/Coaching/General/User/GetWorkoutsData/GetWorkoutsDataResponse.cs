using TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData.Models;

namespace TrainingZ.Application.Modules.Coaching.General.User.GetWorkoutsData;

public record GetWorkoutsDataResponse(bool HasActiveTrainingPlan, List<LastWorkoutData> LastWorkouts);