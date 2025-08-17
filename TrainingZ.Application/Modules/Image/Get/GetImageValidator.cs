using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.Image.Get;

public class GetImageValidator : Validator<GetImageRequest>
{
    public GetImageValidator()
    {
        RuleFor(x => x.ImageId)
            .MustBeCorrectGuid();
    }
}
