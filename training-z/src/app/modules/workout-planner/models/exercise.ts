import { Combo } from './combo';
import { ExerciseType } from './enums/exercise-type';
import { IntensityType } from './enums/intensity-type';

export class Exercise {
  id: string;
  exerciseType: ExerciseType;
  exercise: string | Combo;
  sets: string;
  reps: string;
  intensityType: IntensityType;
  intensity: number;
  rest: string;
  info: string | null;

  constructor(
    id: string,
    exerciseType: ExerciseType,
    exercise: string | Combo,
    sets: string,
    reps: string,
    intensityType: IntensityType,
    intensity: number,
    rest: string,
    info: string | null
  ) {
    this.id = id;
    this.exerciseType = exerciseType;
    this.exercise = exercise;
    this.sets = sets;
    this.reps = reps;
    this.intensityType = intensityType;
    this.intensity = intensity;
    this.rest = rest;
    this.info = info;
  }
}
