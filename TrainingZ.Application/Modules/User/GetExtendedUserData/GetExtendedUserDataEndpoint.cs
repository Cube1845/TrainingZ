using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.User.GetExtendedUserData;

public class GetExtendedUserDataEndpoint(IAppUserRepository appUserRepo) : EndpointWithoutRequest<Result<GetExtendedUserDataResponse>>
{
    private readonly IAppUserRepository _appUserRepo = appUserRepo;

    public override void Configure()
    {
        Get("user/extended");
        Roles(Role.User.ToString(), Role.Coach.ToString());
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userDb = await _appUserRepo.GetExtendedAppUser(User.GetId(), ct);

        await SendOkAsync(Result<GetExtendedUserDataResponse>
            .Success(new(userDb!.Id, userDb.Name, userDb.Surname, userDb.ProfileImageId, userDb.Email, userDb.PhoneNumber)), ct);
    }
}
