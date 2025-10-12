using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Infrastructure.Persistence.Configuration.Domain;

public class TrainingUnitConfiguration : IEntityTypeConfiguration<TrainingUnit>
{
    public void Configure(EntityTypeBuilder<TrainingUnit> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasMany(x => x.TrainingSections).WithOne(x => x.TrainingUnit);
    }
}