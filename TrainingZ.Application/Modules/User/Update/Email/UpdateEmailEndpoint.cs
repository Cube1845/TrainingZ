using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.User.Update.Email;

public class UpdateEmailEndpoint(IAppUserRepository appUserRepo) : Endpoint<UpdateEmailRequest, Result>
{
    private readonly IAppUserRepository _appUserRepo = appUserRepo;

    public override void Configure()
    {
        Put("user/email");
        Roles(Role.Coach.ToString(), Role.User.ToString());
    }

    public override async Task HandleAsync(UpdateEmailRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        await _appUserRepo.UpdateEmail(userId, req.Email, ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
