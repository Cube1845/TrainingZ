using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Entities;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.General.Coach.CreateTrainingPlan;

public class CreateTrainingPlanEndpoint(IAppDbContext context, TimeProvider time) : Endpoint<CreateTrainingPlanRequest, Result<CreateTrainingPlanResponse>>
{
    private readonly IAppDbContext _context = context;
    private readonly TimeProvider _time = time;

    private readonly int _maxTrainingPlansPerStudent = 2;

    public override void Configure()
    {
        Post("coaching/general/plan");
        Roles(Role.Coach.ToString());
    }

    public override async Task HandleAsync(CreateTrainingPlanRequest req, CancellationToken ct)
    {
        var coachingData = await _context.CoachingDatas
            .FirstOrDefaultAsync(x => x.CoachId == User.GetId() && x.StudentId == req.StudentId, ct);

        if (coachingData == null)
        {
            await SendAsync(Result<CreateTrainingPlanResponse>.Error("Incorrect student"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        if (coachingData.TrainingPlans.Count >= _maxTrainingPlansPerStudent)
        {
            await SendAsync(Result<CreateTrainingPlanResponse>.Error("You can't have more than " + _maxTrainingPlansPerStudent + " training plans per student"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        var now = _time.GetUtcNow().LocalDateTime.ToUniversalTime();

        var trainingPlanDb = 
            new TrainingPlan(coachingData.Id, now, "Training plan #" + coachingData.TrainingPlans.Count + 1, false, now);

        await _context.TrainingPlans.AddAsync(trainingPlanDb, ct);
        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result<CreateTrainingPlanResponse>.Success(new(trainingPlanDb.Id)), ct);
    }
}