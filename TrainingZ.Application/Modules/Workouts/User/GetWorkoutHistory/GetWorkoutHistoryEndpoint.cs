using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Application.Modules.Coaching.General.Coach.GetStudentData.Models;
using TrainingZ.Domain.Enums;
using static FastEndpoints.Ep;

namespace TrainingZ.Application.Modules.Workouts.User.GetWorkoutHistory;

public class GetWorkoutHistoryEndpoint(IAppDbContext context) : Endpoint<GetWorkoutHistoryRequest, Result<GetWorkoutHistoryResponse>>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Get("workouts/history");
        Roles(Role.User.ToString(), Role.Coach.ToString());
    }

    public override async Task HandleAsync(GetWorkoutHistoryRequest req, CancellationToken ct)
    {
        var userId = User.GetId();
        var role = User.GetRole();

        Guid studentId;

        if (role == Role.User.ToString())
        {
            studentId = userId;
        }
        else
        {
            if (req.StudentId is null)
            {
                await SendAsync(Result<GetWorkoutHistoryResponse>.Error("studentId is required for coaches."), StatusCodes.Status400BadRequest, ct);
                return;
            }

            var isStudentOfCoach = await _context.CoachingDatas
                .AnyAsync(cd =>
                    cd.StudentId == req.StudentId &&
                    cd.CoachId == userId,
                    ct);

            if (!isStudentOfCoach)
            {
                await SendAsync(Result<GetWorkoutHistoryResponse>.Error("This is not your student"), StatusCodes.Status400BadRequest, ct);
                return;
            }

            studentId = req.StudentId.Value;
        }

        var workouts = await _context.Workouts
            .Where(x =>
                x.TrainingUnit!.TrainingPlan!.CoachingData!.StudentId == studentId &&
                !x.IsActive &&
                x.Finished != null
            )
            .OrderByDescending(x => x.Finished)
            .Select(x => new LastWorkoutData(
                x.Id,
                x.TrainingUnit!.TrainingPlan!.Name,
                x.TrainingUnit.Name,
                x.Finished!.Value
            ))
            .ToListAsync(ct);

        await SendOkAsync(Result<GetWorkoutHistoryResponse>.Success(new(workouts)), ct);
    }
}