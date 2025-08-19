using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrainingZ.Application.Common.Models;

namespace TrainingZ.Infrastructure.Persistence.Configuration.Auth;

public class ImageConfiguration : IEntityTypeConfiguration<Image>
{
    public void Configure(EntityTypeBuilder<Image> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Data)
            .HasColumnType("bytea");
    }
}