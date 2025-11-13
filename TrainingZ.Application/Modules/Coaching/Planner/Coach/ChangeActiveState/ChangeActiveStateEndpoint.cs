using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.Planner.Coach.ChangeActiveState;

public class ChangeActiveStateEndpoint(IAppDbContext context) : Endpoint<ChangeActiveStateRequest, Result>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Put("coaching/planner/activity");
        Roles(Role.Coach.ToString());
    }

    public override async Task HandleAsync(ChangeActiveStateRequest req, CancellationToken ct)
    {
        var trainingPlans = await _context.TrainingPlans
            .Include(x => x.CoachingData)
            .Where(x => x.CoachingData!.CoachId == User.GetId() && x.CoachingData.StudentId == req.StudentId)
            .ToListAsync(ct);

        var modifiedTrainingPlan = trainingPlans.First(x => x.Id == req.TrainingPlanId);

        if (modifiedTrainingPlan.IsActive)
        {
            modifiedTrainingPlan.IsActive = false;
        }
        else
        {
            foreach (var plan in trainingPlans.Where(x => x.Id != modifiedTrainingPlan.Id))
            {
                plan.IsActive = false;
            }

            modifiedTrainingPlan.IsActive = true;
        }

        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
