using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Workouts.User.StartWorkout;

public class StartWorkoutValidator : Validator<StartWorkoutRequest>
{
    public StartWorkoutValidator()
    {
        RuleFor(x => x.TrainingUnitId)
            .MustBeCorrectGuid();
    }
}
