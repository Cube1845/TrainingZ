using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Notifications.DeleteNotification;

public class DeleteNotificationEndpoint(IAppDbContext context) : Endpoint<DeleteNotificationRequest, Result>
{
    private readonly IAppDbContext _context = context;

    public override void Configure()
    {
        Delete("notifications/{NotificationId}");
        Roles(Role.User.ToString(), Role.Coach.ToString());
    }

    public override async Task HandleAsync(DeleteNotificationRequest req, CancellationToken ct)
    {
        var userId = User.GetId();

        var notification = await _context.Notifications
            .FirstOrDefaultAsync(x => x.Id == req.NotificationId, ct);

        if (notification == null)
        {
            await SendAsync(Result.Error("Notification does not exist"), StatusCodes.Status404NotFound, ct);
            return;
        }

        if (notification.ReceiverId != userId)
        {
            await SendAsync(Result.Error("You cannot delete this notification"), StatusCodes.Status403Forbidden, ct);
            return;
        }

        _context.Notifications.Remove(notification);
        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
