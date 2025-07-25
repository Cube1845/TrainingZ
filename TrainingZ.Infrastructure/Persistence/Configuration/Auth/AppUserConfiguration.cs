using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrainingZ.Infrastructure.Auth.Entities;

namespace TrainingZ.Infrastructure.Persistence.Configuration.Auth;

public class CoachingDataConfiguration : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Email).IsRequired();
        builder.Property(x => x.PasswordHash).IsRequired();

        builder.HasMany(x => x.RefreshTokens).WithOne(x => x.Owner);
    }
}