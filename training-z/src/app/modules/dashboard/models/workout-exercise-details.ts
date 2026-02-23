export type WorkoutExerciseDetails = {
  exerciseName: string;
  sets: {
    index: number;
    done: boolean;
    comment: string;
  }[];
};
