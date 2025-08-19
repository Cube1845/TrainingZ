using TrainingZ.Domain.Interfaces;

namespace TrainingZ.Application.Common.Interfaces;

public interface IAppUserRepository
{
    Task<IAppUser?> GetAppUser(Guid id, CancellationToken ct = default);
    Task<bool> AppUserExists(Guid id, CancellationToken ct = default);
    Task<List<IAppUser>> GetAppUsers(List<Guid> userIds, CancellationToken ct = default);
    Task<IExtendedAppUser?> GetExtendedAppUser(Guid id, CancellationToken ct = default);
    Task UpdateName(Guid id, string name, string surname, CancellationToken ct = default);
    Task UpdateEmail(Guid id, string email, CancellationToken ct = default);
    Task UpdatePhoneNumber(Guid id, string? phoneNumber, CancellationToken ct = default);
    Task UpdateProfileImageId(Guid userId, Guid? imageId, CancellationToken ct = default);
}
