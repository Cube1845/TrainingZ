using TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData.Models;
using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData;

public record GetStudentDataResponse(IExtendedAppUser StudentData, List<TrainingPlanInfo> TrainingPlans, List<LastWorkoutData> LastWorkouts);