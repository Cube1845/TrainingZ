using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Extensions;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Application.Modules.Notifications.GetNotifications;

public class GetNotificationsEndpoint(IAppDbContext context, IAppUserRepository appUserRepository) : EndpointWithoutRequest<Result<GetNotificationsResponse>>
{
    private readonly IAppDbContext _context = context;
    private readonly IAppUserRepository _appUserRepository = appUserRepository;

    public override void Configure()
    {
        Get("notifications");
        Roles(Role.User.ToString(), Role.Coach.ToString());
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetId();

        var notifications = await _context.Notifications
            .Where(x => x.ReceiverId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .Take(100)
            .ToListAsync(ct);

        var senderIds = notifications
            .Select(x => x.SenderId)
            .Distinct()
            .ToList();

        var senders = await _appUserRepository.GetAppUsers(senderIds, ct);
        var senderMap = senders.ToDictionary(x => x.Id, x => $"From {x.Name} {x.Surname}");

        var response = notifications
            .Select(x => new NotificationDto(
                x.Id,
                senderMap.GetValueOrDefault(x.SenderId, "From TrainingZ"),
                x.Message,
                x.CreatedAt
            ))
            .ToList();

        await SendOkAsync(Result<GetNotificationsResponse>.Success(new(response)), ct);
    }
}
