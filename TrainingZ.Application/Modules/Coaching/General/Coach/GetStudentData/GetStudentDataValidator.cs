using FluentValidation;
using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData;

public class GetStudentDataValidator : Validator<GetStudentDataRequest>
{
    public GetStudentDataValidator()
    {
        RuleFor(x => x.StudentData)
            .NotNull()
            .MustBeCorrectGuid();
    }
}
