using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Workouts.User.GetWorkoutDetails;

public class GetWorkoutDetailsValidator : Validator<GetWorkoutDetailsRequest>
{
    public GetWorkoutDetailsValidator()
    {
        RuleFor(x => x.Id)
            .MustBeCorrectGuid();
    }
}
