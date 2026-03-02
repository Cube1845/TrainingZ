using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Entities;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Notifications.SendNotification;

public class SendNotificationEndpoint(IAppDbContext context, TimeProvider time) : Endpoint<SendNotificationRequest, Result>
{
    private readonly IAppDbContext _context = context;
    private readonly TimeProvider _time = time;

    public override void Configure()
    {
        Post("notifications");
        Roles(Role.User.ToString(), Role.Coach.ToString());
    }

    public override async Task HandleAsync(SendNotificationRequest req, CancellationToken ct)
    {
        var senderId = User.GetId();

        if (senderId == req.ReceiverId)
        {
            await SendAsync(Result.Error("Cannot send a notification to yourself"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        var canSend = await _context.CoachingDatas.AnyAsync(x =>
            (x.CoachId == senderId && x.StudentId == req.ReceiverId)
            || (x.StudentId == senderId && x.CoachId == req.ReceiverId), ct);

        if (!canSend)
        {
            await SendAsync(Result.Error("You can only send notifications to your coach or student"), StatusCodes.Status400BadRequest, ct);
            return;
        }

        var notification = new Notification(
            senderId,
            req.ReceiverId,
            req.Message.Trim(),
            _time.GetUtcNow().UtcDateTime
        );

        await _context.Notifications.AddAsync(notification, ct);
        await _context.SaveChangesAsync(ct);

        await SendOkAsync(Result.Success(), ct);
    }
}
