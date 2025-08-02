using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;

namespace TrainingZ.Application.Modules.Coaching.Manage.User.GetCode;

public class GetCodeEndpoint(IAppDbContext context) : EndpointWithoutRequest<Result<GetCodeResponse>>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Get("coaching/manage/code");
        // role User
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var invitationDb = await _context.InvitationDatas
            .FirstOrDefaultAsync(x => x.UserId == User.GetId(), ct);

        if (invitationDb == null || invitationDb.HasCoach)
        {
            await SendAsync(Result<GetCodeResponse>.Error("Invalid user"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        await SendOkAsync(Result<GetCodeResponse>.Success(new(invitationDb.Code)), ct);
    }
}
