using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Infrastructure.Persistence.Repositories;

public class AppUserRepository(AppDbContext context) : IAppUserRepository
{
    private readonly AppDbContext _context = context;

    public async Task<IAppUser?> GetAppUser(Guid id, CancellationToken ct)
    {
        return await _context.AppUsers.FindAsync([id], ct);
    }

    public async Task<List<IAppUser>> GetAppUsers(List<Guid> userIds, CancellationToken ct)
    {
        var appUsersDb = await _context.AppUsers
            .Where(x => userIds.Contains(x.Id))
            .ToListAsync(ct);

        return appUsersDb
            .Select(x => (IAppUser)x)
            .ToList();
    }

    public async Task<IExtendedAppUser?> GetExtendedAppUser(Guid id, CancellationToken ct)
    {
        return await _context.AppUsers.FindAsync([id], ct);
    }

    public async Task<bool> AppUserExists(Guid id, CancellationToken ct)
    {
        return await _context.AppUsers.AnyAsync(x => x.Id == id, ct);
    }

    public async Task UpdateName(Guid id, string name, string surname, CancellationToken ct)
    {
        await _context.AppUsers
            .Where(x => x.Id == id)
            .ExecuteUpdateAsync(x => x
                .SetProperty(p => p.Name, name)
                .SetProperty(p => p.Surname, surname)
            , ct);
    }

    public async Task UpdateEmail(Guid id, string email, CancellationToken ct)
    {
        await _context.AppUsers
            .Where(x => x.Id == id)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.Email, email), ct);
    }

    public async Task UpdatePhoneNumber(Guid id, string? phoneNumber, CancellationToken ct)
    {
        await _context.AppUsers
            .Where(x => x.Id == id)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.PhoneNumber, phoneNumber), ct);
    }

    public async Task UpdateProfileImageId(Guid userId, Guid? imageId, CancellationToken ct)
    {
        await _context.AppUsers
            .Where(x => x.Id == userId)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.ProfileImageId, imageId), ct);
    }
}
