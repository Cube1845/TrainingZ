using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.User.Update.Name;

public class UpdateNameEndpoint(IAppUserRepository appUserRepo) : Endpoint<UpdateNameRequest, Result>
{
    private readonly IAppUserRepository _appUserRepo = appUserRepo;

    public override void Configure()
    {
        Put("user/update/name");
        Roles(Role.User.ToString(), Role.Coach.ToString());
    }

    public override async Task HandleAsync(UpdateNameRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        await _appUserRepo.UpdateName(userId, req.Name, req.Surname, ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
