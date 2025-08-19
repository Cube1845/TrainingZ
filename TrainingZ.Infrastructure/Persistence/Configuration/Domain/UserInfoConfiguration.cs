using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Infrastructure.Persistence.Configuration.Domain;

public class UserInfoConfiguration : IEntityTypeConfiguration<UserInfo>
{
    public void Configure(EntityTypeBuilder<UserInfo> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.InvitationData).WithOne(x => x.UserInfo);
    }
}