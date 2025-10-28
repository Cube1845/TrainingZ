using TrainingZ.Domain.Abstract;
using TrainingZ.Domain.Enums;

namespace TrainingZ.Domain.Entities;

public class Exercise : BaseEntity
{
    public Guid TrainingSectionId { get; set; }
    public TrainingSection? TrainingSection { get; set; }
    public int Index { get; set; }
    public ExerciseType ExerciseType { get; set; }
    public string Name { get; set; }
    public string Sets { get; set; }
    public string Reps { get; set; }
    public IntensityType IntensityType { get; set; }
    public double Intensity { get; set; }
    public string Rest { get; set; }
    public string? Info { get; set; }

    public Exercise(Guid trainingSectionId, int index, ExerciseType exerciseType, string name, string sets, string reps, IntensityType intensityType, double intensity, string rest, string? info, DateTime createdAt)
    {
        TrainingSectionId = trainingSectionId;
        Index = index;
        ExerciseType = exerciseType;
        Name = name;
        Sets = sets;
        Reps = reps;
        IntensityType = intensityType;
        Intensity = intensity;
        Rest = rest;
        Info = info;
        CreatedAt = createdAt;
    }
}
