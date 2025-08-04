using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.User.GetUserData;

public class GetUserDataEndpoint(IAppUserRepository appUserRepo) : EndpointWithoutRequest<Result<GetUserDataResponse>>
{
    private readonly IAppUserRepository _appUserRepo = appUserRepo;

    public override void Configure()
    {
        Get("user");
        Roles(Role.User.ToString(), Role.Coach.ToString());
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userDb = await _appUserRepo.GetAppUser(User.GetId(), ct);

        await SendOkAsync(Result<GetUserDataResponse>
            .Success(new(userDb!.Id, userDb.Name, userDb.Surname, userDb.ProfileImageId)), ct);
    }
}
