namespace TrainingZ.Application.Common.Interfaces;

public interface IAppDbContext
{
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
