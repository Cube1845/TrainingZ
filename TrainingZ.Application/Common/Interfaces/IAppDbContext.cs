using Microsoft.EntityFrameworkCore;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Application.Common.Interfaces;

public interface IAppDbContext
{
    DbSet<CoachingData> CoachingDatas { get; set; }
    DbSet<InvitationData> InvitationDatas { get; set; }
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
