using TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData.Models;

namespace TrainingZ.Application.Modules.Workouts.User.GetWorkoutsData;

public record GetWorkoutsDataResponse(bool HasCurrentWorkout, bool HasActiveTrainingPlan, List<LastWorkoutData> LastWorkouts);