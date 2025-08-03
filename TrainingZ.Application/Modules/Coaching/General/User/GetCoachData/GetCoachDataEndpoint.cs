using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;

namespace TrainingZ.Application.Modules.Coaching.General.User.GetCoachData;

public class GetCoachDataEndpoint(IAppDbContext context, IAppUserRepository appUserRepo) : EndpointWithoutRequest<Result<GetCoachDataResponse>>
{
    private readonly IAppDbContext _context = context;
    private readonly IAppUserRepository _appUserRepo = appUserRepo;

    public override void Configure()
    {
        Get("coaching/general/coach");
        // role User
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetId();

        var coachingData = await _context.CoachingDatas.FirstOrDefaultAsync(x => x.StudentId == userId, ct);

        if (coachingData == null)
        {
            await SendOkAsync(Result<GetCoachDataResponse>.Success(null!), ct);
            return;
        }

        var coachDb = await _appUserRepo.GetExtendedAppUser(coachingData.CoachId, ct);

        await SendOkAsync(Result<GetCoachDataResponse>.Success(
            new(coachDb!.Id, coachDb.Name, coachDb.Surname, coachDb.ProfileImageId, coachDb.Email, coachDb.PhoneNumber)
        ), ct);
    }
}
