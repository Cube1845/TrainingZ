using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Infrastructure.Persistence.Configuration.Domain;

public class DoneSetConfiguration : IEntityTypeConfiguration<DoneSet>
{
    public void Configure(EntityTypeBuilder<DoneSet> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.DoneExercise).WithMany(x => x.DoneSets);

        builder.HasIndex(x => new { x.DoneExerciseId, x.SetIndex }).IsUnique();
    }
}