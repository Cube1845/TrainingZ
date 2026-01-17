using TrainingZ.Application.Modules.Workouts.User.SaveWorkout;
using TrainingZ.Domain.Entities;

namespace TrainingZ.Application.Modules.Workouts.Helpers;

public static class TrainingProgressHelper
{
    public static void PersistProgress(Workout workout, SaveWorkoutRequest req, DateTime now) {
        var incomingExerciseIds = req.Exercises
            .Select(x => x.ExerciseId)
            .ToHashSet();

        var exercisesToRemove = workout.DoneExercises
            .Where(x => !incomingExerciseIds.Contains(x.ExerciseId))
            .ToList();

        foreach (var ex in exercisesToRemove)
            workout.DoneExercises.Remove(ex);

        foreach (var ex in req.Exercises)
        {
            var doneExercise = workout.DoneExercises
                .FirstOrDefault(x => x.ExerciseId == ex.ExerciseId);

            if (doneExercise == null)
            {
                doneExercise = new DoneExercise(
                    workout.Id,
                    ex.ExerciseId,
                    now
                );

                workout.DoneExercises.Add(doneExercise);
            }

            var incomingIndexes = ex.Sets
                .Select(x => x.Index)
                .ToHashSet();

            var setsToRemove = doneExercise.DoneSets
                .Where(x => !incomingIndexes.Contains(x.SetIndex))
                .ToList();

            foreach (var s in setsToRemove)
                doneExercise.DoneSets.Remove(s);

            foreach (var set in ex.Sets)
            {
                var doneSet = doneExercise.DoneSets
                    .FirstOrDefault(x => x.SetIndex == set.Index);

                if (doneSet == null)
                {
                    doneExercise.DoneSets.Add(new DoneSet(
                        set.Comment,
                        set.Index,
                        set.Done,
                        doneExercise.Id,
                        now
                    ));
                }
                else
                {
                    doneSet.IsDone = set.Done;
                    doneSet.Comment = set.Comment;
                }
            }
        }
    }
}
