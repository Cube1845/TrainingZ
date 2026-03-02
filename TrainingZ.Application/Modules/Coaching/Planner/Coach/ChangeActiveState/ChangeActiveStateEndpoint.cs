using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Entities;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.Planner.Coach.ChangeActiveState;

public class ChangeActiveStateEndpoint(IAppDbContext context, TimeProvider time) : Endpoint<ChangeActiveStateRequest, Result>
{
    private readonly IAppDbContext _context = context;
    private readonly TimeProvider _time = time;

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

        bool wasActive = modifiedTrainingPlan.IsActive;

        if (wasActive)
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

        await _context.Notifications.AddAsync(new Notification(
            User.GetId(),
            req.StudentId,
            wasActive
                ? $"Your coach deactivated training plan '{modifiedTrainingPlan.Name}'."
                : $"Your coach activated training plan '{modifiedTrainingPlan.Name}'.",
            _time.GetUtcNow().UtcDateTime
        ), ct);

        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
