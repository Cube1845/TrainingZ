using FluentValidation;
using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Workouts.User.SaveWorkout;

public class SaveWorkoutValidator : Validator<SaveWorkoutRequest>
{
    public SaveWorkoutValidator()
    {
        RuleFor(x => x.WorkoutId)
            .MustBeCorrectGuid();

        RuleFor(x => x.Exercises)
            .NotNull();
    }
}
