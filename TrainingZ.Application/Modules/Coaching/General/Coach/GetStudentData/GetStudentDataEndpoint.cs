using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData;

public class GetStudentDataEndpoint(IAppUserRepository appUserRepo, IAppDbContext context) : Endpoint<GetStudentDataRequest, Result<GetStudentDataResponse>>
{
    private readonly IAppUserRepository _appUserRepo = appUserRepo;
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Get("coaching/general/student-data/{StudentData}");
        Roles(Role.Coach.ToString());
    }

    public override async Task HandleAsync(GetStudentDataRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        var appUser = await _appUserRepo.GetExtendedAppUser(req.StudentData, ct);

        if (appUser == null)
        {
            await SendAsync(Result<GetStudentDataResponse>.Error("This student doesn't exist"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        var trainingPlans = await _context.TrainingPlans
            .Include(x => x.CoachingData)
            .Where(x => x.CoachingData!.CoachId == userId)
            .Select(x => new TrainingPlanInfo(x.Id, x.Name, x.LastModified, x.IsActive))
            .ToListAsync(ct);

        var lastWorkouts = await _context.Workouts
            .Include(x => x.TrainingUnit)
            .ThenInclude(x => x!.TrainingPlan)
            .ThenInclude(x => x!.CoachingData)
            .Where(x => x.TrainingUnit!.TrainingPlan!.CoachingData!.CoachId == userId)
            .Select(x => new LastWorkoutData(x.Id, x.TrainingUnit!.TrainingPlan!.Name, x.TrainingUnit.Name, x.Finished))
            .ToListAsync(ct);

        await SendOkAsync(Result<GetStudentDataResponse>.Success(new(appUser, trainingPlans, lastWorkouts)), ct);
    }
}
