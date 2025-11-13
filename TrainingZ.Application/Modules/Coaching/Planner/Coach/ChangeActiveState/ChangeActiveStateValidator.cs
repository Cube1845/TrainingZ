using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Coaching.Planner.Coach.ChangeActiveState;

public class ChangeActiveStateValidator : Validator<ChangeActiveStateRequest>
{
    public ChangeActiveStateValidator()
    {
        RuleFor(x => x.TrainingPlanId)
            .MustBeCorrectGuid();

        RuleFor(x => x.StudentId)
            .MustBeCorrectGuid();
    }
}
