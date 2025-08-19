using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Application.Modules.Coaching.Manage.User.Models;
using TrainingZ.Domain.Entities;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Coaching.Manage.User.GetCode;

public class GetUserInfoEndpoint(IAppDbContext context) : EndpointWithoutRequest<Result<GetUserInfoResponse>>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Get("coaching/manage/code");
        Roles(Role.User.ToString());
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var invitationDb = await _context.InvitationDatas
            .Include(x => x.UserInfo)
            .FirstOrDefaultAsync(x => x.UserId == User.GetId(), ct);

        if (invitationDb == null || invitationDb.HasCoach)
        {
            await SendAsync(Result<GetUserInfoResponse>.Error("Invalid user"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        var userInfo = (UserInfoDto)invitationDb.UserInfo!;

        await SendOkAsync(Result<GetUserInfoResponse>.Success(new(invitationDb.Code, userInfo)), ct);
    }
}
