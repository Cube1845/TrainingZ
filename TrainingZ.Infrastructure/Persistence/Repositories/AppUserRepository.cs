using Microsoft.EntityFrameworkCore;
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

    public async Task<bool> AppUserExists(Guid id, CancellationToken ct)
    {
        return await _context.AppUsers.AnyAsync(x => x.Id == id, ct);
    }
}
