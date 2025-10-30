using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Coaching.Planner.Coach.Get;

public class GetTrainingPlanValidator : Validator<GetTrainingPlanRequest>
{
    public GetTrainingPlanValidator()
    {
        RuleFor(x => x.TrainingPlanId)
            .MustBeCorrectGuid();
    }
}
