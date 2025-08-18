using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.Manage.User.UpdateUserInfo;

public class UpdateUserInfoEndpoint(IAppDbContext context) : Endpoint<UpdateUserInfoRequest, Result>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Put("user/info");
        Roles(Role.Coach.ToString(), Role.User.ToString());
    }

    public override async Task HandleAsync(UpdateUserInfoRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        await _context.InvitationDatas
            .Include(x => x.UserInfo)
            .Where(x => x.UserId == userId)
            .Select(x => x.UserInfo)
            .ExecuteUpdateAsync(x => x
                .SetProperty(p => p!.Goals, req.Goals)
                .SetProperty(p => p!.SleepDiet, req.SleepDiet)
                .SetProperty(p => p!.Activity, req.Activity)
                .SetProperty(p => p!.Injuries, req.Injuries)
                .SetProperty(p => p!.TimeAvaiable, req.TimeAvaiable)
                .SetProperty(p => p!.Other, req.Other)
            , ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
