using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Infrastructure.Persistence.Configuration.Domain;

public class InvitationDataConfiguration : IEntityTypeConfiguration<InvitationData>
{
    public void Configure(EntityTypeBuilder<InvitationData> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasIndex(x => x.UserId).IsUnique();
        builder.HasIndex(x => x.Code).IsUnique();
    }
}