using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Application.Common.Interfaces;

public interface IAppUserRepository
{
    Task<IAppUser?> GetAppUser(Guid id, CancellationToken ct = default);
}
