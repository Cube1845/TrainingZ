using TrainingZ.Application.Common.Extensions;

namespace TrainingZ.Application.Modules.User.Update.ProfileImage;

public class UpdateProfileImageValidator : Validator<UpdateProfileImageRequest>
{
    public UpdateProfileImageValidator()
    {
        RuleFor(x => x.ImageFile)
            .MustBeCorrectImageFile();
    }
}