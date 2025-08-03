using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Application.Common.Interfaces;

public interface IAppUserRepository
{
    Task<IAppUser?> GetAppUser(Guid id, CancellationToken ct = default);
    Task<bool> AppUserExists(Guid id, CancellationToken ct = default);
    Task<List<IAppUser>> GetAppUsers(List<Guid> userIds, CancellationToken ct = default);
}
