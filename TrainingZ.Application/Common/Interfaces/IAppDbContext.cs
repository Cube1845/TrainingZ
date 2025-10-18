using Microsoft.EntityFrameworkCore;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Application.Common.Interfaces;

public interface IAppDbContext
{
    DbSet<CoachingData> CoachingDatas { get; set; }
    DbSet<InvitationData> InvitationDatas { get; set; }
    DbSet<UserInfo> UserInfos { get; set; }
    DbSet<TrainingPlan> TrainingPlans { get; set; }
    DbSet<TrainingUnit> TrainingUnits { get; set; }
    DbSet<TrainingSection> TrainingSections { get; set; }
    DbSet<Exercise> Exercises { get; set; }
    DbSet<Workout> Workouts { get; set; }
    DbSet<DoneExercise> DoneExercises { get; set; }
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
