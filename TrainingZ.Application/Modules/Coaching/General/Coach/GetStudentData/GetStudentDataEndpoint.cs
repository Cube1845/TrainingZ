using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData;

public class GetStudentDataEndpoint(IAppUserRepository appUserRepo) : Endpoint<GetStudentDataRequest, Result<GetStudentDataResponse>>
{
    private readonly IAppUserRepository _appUserRepo = appUserRepo;

    public override void Configure()
    {
        Get("coaching/general/student-data/{StudentData}");
        Roles(Role.Coach.ToString());
    }

    public override async Task HandleAsync(GetStudentDataRequest req, CancellationToken ct)
    {
        var appUser = await _appUserRepo.GetExtendedAppUser(req.StudentData, ct);

        await SendOkAsync(Result<GetStudentDataResponse>.Success(new(appUser!.Id, appUser.Name, appUser.Surname, appUser.ProfileImageId, appUser.PhoneNumber, appUser.Email)), ct);
    }
}
