using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Infrastructure.Persistence.Configuration.Domain;

public class TrainingPlanConfiguration : IEntityTypeConfiguration<TrainingPlan>
{
    public void Configure(EntityTypeBuilder<TrainingPlan> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.CoachingData).WithMany(x => x.TrainingPlans);

        builder.HasMany(x => x.TrainingUnits).WithOne(x => x.TrainingPlan);
    }
}