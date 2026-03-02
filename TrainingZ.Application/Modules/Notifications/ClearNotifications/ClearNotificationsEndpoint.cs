using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Notifications.ClearNotifications;

public class ClearNotificationsEndpoint(IAppDbContext context) : EndpointWithoutRequest<Result>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Delete("notifications");
        Roles(Role.User.ToString(), Role.Coach.ToString());
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetId();

        await _context.Notifications
            .Where(x => x.ReceiverId == userId)
            .ExecuteDeleteAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
