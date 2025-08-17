using Microsoft.AspNetCore.Http;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.User.Update.ProfileImage;

public class UpdateProfileImageEndpoint(IImageService imageService, IAppUserRepository appUserRepo) : Endpoint<UpdateProfileImageRequest, Result>
{
    private readonly IImageService _imageService = imageService;
    private readonly IAppUserRepository _appUserRepo = appUserRepo;

    public override void Configure()
    {
        Put("user/profile");
        Roles(Role.Coach.ToString(), Role.User.ToString());
        AllowFileUploads();
    }

    public override async Task HandleAsync(UpdateProfileImageRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        var appUserDb = await _appUserRepo.GetAppUser(userId, ct);

        if (appUserDb == null)
        {
            await SendAsync(Result.Error("Invalid user id"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        Guid? imageId = null;

        if (appUserDb.ProfileImageId == null)
        {
            if (req.ImageFile != null)
            {
                imageId = await _imageService.AddImage(req.ImageFile, ct);
            }
        }
        else
        {
            if (req.ImageFile == null)
            {
                await _imageService.RemoveImage(appUserDb.ProfileImageId.Value, ct);
            }
            else
            {
                await _imageService.UpdateImageData(appUserDb.ProfileImageId.Value, req.ImageFile, ct);
                imageId = appUserDb.ProfileImageId;
            }
        }

        await _appUserRepo.UpdateProfileImageId(userId, imageId, ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
