using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.Planner.Coach.Get;

public class GetTrainingPlanEndpoint(IAppDbContext context, IAppUserRepository appUserRepo) : Endpoint<GetTrainingPlanRequest, Result<GetTrainingPlanResponse>>
{
    private readonly IAppDbContext _context = context;
    private readonly IAppUserRepository _appUserRepo = appUserRepo;

    public override void Configure()
    {
        Get("coaching/planner/{TrainingPlanId}");
        Roles(Role.Coach.ToString());
    }

    public override async Task HandleAsync(GetTrainingPlanRequest req, CancellationToken ct)
    {
        var planDb = await _context.TrainingPlans
            .Include(x => x.TrainingUnits)
            .ThenInclude(x => x.TrainingSections)
            .ThenInclude(x => x.Exercises)
            .FirstOrDefaultAsync(x => x.Id == req.TrainingPlanId, ct);

        if (planDb == null)
        {
            await SendAsync(Result<GetTrainingPlanResponse>.Error("This plan doesn't exist"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        var studentId = await _context.TrainingPlans
            .Include(x => x.CoachingData)
            .Where(x => x.Id == planDb.Id)
            .Select(x => x.CoachingData!.StudentId)
            .FirstOrDefaultAsync(ct);

        var userInfoDb = await _context.InvitationDatas
            .Include(x => x.UserInfo)
            .Where(x => x.UserId == studentId)
            .Select(x => x.UserInfo)
            .FirstOrDefaultAsync(ct);

        var studentDb = await _appUserRepo.GetAppUser(studentId, ct);

        await SendOkAsync(Result<GetTrainingPlanResponse>.Success(new(planDb.DeepCopyWithoutInclusions(), userInfoDb!, studentDb!)), ct);
    }
}