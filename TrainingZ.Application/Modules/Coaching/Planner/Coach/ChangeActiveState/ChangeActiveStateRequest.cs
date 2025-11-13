namespace TrainingZ.Application.Modules.Coaching.Planner.Coach.ChangeActiveState;

public record ChangeActiveStateRequest(Guid TrainingPlanId, Guid StudentId);