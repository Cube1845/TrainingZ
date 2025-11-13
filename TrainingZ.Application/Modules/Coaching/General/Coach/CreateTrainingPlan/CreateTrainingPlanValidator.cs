using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Coaching.General.Coach.CreateTrainingPlan;

public class CreateTrainingPlanValidator : Validator<CreateTrainingPlanRequest>
{
    public CreateTrainingPlanValidator()
    {
        RuleFor(x => x.StudentId)
            .MustBeCorrectGuid();
    }
}
