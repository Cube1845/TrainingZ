using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Infrastructure.Persistence.Configuration.Domain;

public class CoachingDataConfiguration : IEntityTypeConfiguration<CoachingData>
{
    public void Configure(EntityTypeBuilder<CoachingData> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasIndex(x => x.StudentId).IsUnique();
        builder.HasIndex(x => x.CoachId).IsUnique();
    }
}