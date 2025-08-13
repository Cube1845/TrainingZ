using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.User.Update.PhoneNumber;

public class UpdatePhoneNumberEndpoint(IAppUserRepository appUserRepo) : Endpoint<UpdatePhoneNumberRequest, Result>
{
    private readonly IAppUserRepository _appUserRepo = appUserRepo;

    public override void Configure()
    {
        Put("user/update/phone");
        Roles(Role.Coach.ToString(), Role.User.ToString());
    }

    public override async Task HandleAsync(UpdatePhoneNumberRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        await _appUserRepo.UpdatePhoneNumber(userId, req.PhoneNumber, ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
