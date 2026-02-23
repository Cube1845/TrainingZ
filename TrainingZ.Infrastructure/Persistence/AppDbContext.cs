using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;
using TrainingZ.Domain.Entities;
using TrainingZ.Infrastructure.Auth.Entites;

namespace TrainingZ.Infrastructure.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options), IAppDbContext
{
    public DbSet<AppUser> AppUsers { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    public DbSet<Image> Images { get; set; }

    public DbSet<CoachingData> CoachingDatas { get; set; }
    public DbSet<InvitationData> InvitationDatas { get; set; }
    public DbSet<UserInfo> UserInfos { get; set; }

    public DbSet<TrainingPlan> TrainingPlans { get; set; }
    public DbSet<TrainingUnit> TrainingUnits { get; set; }
    public DbSet<TrainingSection> TrainingSections { get; set; }
    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<Workout> Workouts { get; set; }
    public DbSet<DoneExercise> DoneExercises { get; set; }
    public DbSet<DoneSet> DoneSets { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
