using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Coaching.General.Coach.DeleteTrainingPlan;

public class DeleteTrainingPlanValidator : Validator<DeleteTrainingPlanRequest>
{
    public DeleteTrainingPlanValidator()
    {
        RuleFor(x => x.PlanId)
            .MustBeCorrectGuid();
    }
}
