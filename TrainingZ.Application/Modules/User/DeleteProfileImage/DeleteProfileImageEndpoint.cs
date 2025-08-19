using Microsoft.AspNetCore.Http;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.User.DeleteProfileImage;

public class DeleteProfileImageEndpoint(IImageService imageService, IAppUserRepository appUserRepo) : EndpointWithoutRequest<Result>
{
    private readonly IImageService _imageService = imageService;
    private readonly IAppUserRepository _appUserRepo = appUserRepo;

    public override void Configure()
    {
        Delete("user/profile");
        Roles(Role.Coach.ToString(), Role.User.ToString());
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetId();

        var appUser = await _appUserRepo.GetAppUser(userId, ct);

        if (appUser!.ProfileImageId == null)
        {
            await SendAsync(Result.Error("You don't have a profile picture"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        await _imageService.RemoveImage(appUser!.ProfileImageId!.Value, ct);

        await _appUserRepo.UpdateProfileImageId(userId, null, ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
