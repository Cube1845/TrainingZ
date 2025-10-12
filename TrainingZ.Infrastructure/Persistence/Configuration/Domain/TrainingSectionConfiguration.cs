using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Infrastructure.Persistence.Configuration.Domain;

public class TrainingSectionConfiguration : IEntityTypeConfiguration<TrainingSection>
{
    public void Configure(EntityTypeBuilder<TrainingSection> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasMany(x => x.Exercises).WithOne(x => x.TrainingSection);
    }
}