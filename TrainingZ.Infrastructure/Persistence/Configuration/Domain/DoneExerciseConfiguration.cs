using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Infrastructure.Persistence.Configuration.Domain;

public class DoneExerciseConfiguration : IEntityTypeConfiguration<DoneExercise>
{
    public void Configure(EntityTypeBuilder<DoneExercise> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Workout).WithMany(x => x.DoneExercises);
    }
}