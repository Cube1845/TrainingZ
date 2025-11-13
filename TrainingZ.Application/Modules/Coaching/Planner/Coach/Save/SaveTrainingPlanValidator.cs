using FluentValidation;

namespace TrainingZ.Application.Modules.Coaching.Planner.Coach.Save;

public class SaveTrainingPlanValidator : Validator<SaveTrainingPlanRequest>
{
    public SaveTrainingPlanValidator()
    {
        RuleFor(x => x.Plan)
            .Must(x => x.Name != null && x.Name.Length >= 3);
    }
}
