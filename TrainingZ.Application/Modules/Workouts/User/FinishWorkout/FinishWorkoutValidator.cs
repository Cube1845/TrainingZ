using FluentValidation;
using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Workouts.User.FinishWorkout;

public class FinishWorkoutValidator : Validator<FinishWorkoutRequest>
{
    public FinishWorkoutValidator()
    {
        RuleFor(x => x.WorkoutId)
            .MustBeCorrectGuid();

        RuleFor(x => x.Exercises)
            .NotNull();
    }
}
