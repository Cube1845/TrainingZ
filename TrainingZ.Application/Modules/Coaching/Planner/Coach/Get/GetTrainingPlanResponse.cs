using TrainingZ.Domain.Entities;
using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Application.Modules.Coaching.Planner.Coach.Get;

public record GetTrainingPlanResponse(TrainingPlan TrainingPlan, UserInfo StudentInfo, IAppUser StudentData);