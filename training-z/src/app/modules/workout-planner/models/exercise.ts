import { Combo } from './combo';
import { ExerciseType } from './enums/exercise-type';
import { IntensityType } from './enums/intensity-type';

export class Exercise {
  id: string;
  exerciseType: ExerciseType;
  name: string | Combo;
  sets: string;
  reps: string;
  intensityType: IntensityType;
  intensity: number;
  rest: string;
  info: string | null;

  constructor(
    id: string,
    exerciseType: ExerciseType,
    name: string | Combo,
    sets: string,
    reps: string,
    intensityType: IntensityType,
    intensity: number,
    rest: string,
    info: string | null
  ) {
    this.id = id;
    this.exerciseType = exerciseType;
    this.name = name;
    this.sets = sets;
    this.reps = reps;
    this.intensityType = intensityType;
    this.intensity = intensity;
    this.rest = rest;
    this.info = info;
  }

  static fromBackend(raw: any): Exercise {
    return new Exercise(
      raw.id,
      raw.exerciseType,
      raw.name,
      raw.sets,
      raw.reps,
      raw.intensityType,
      raw.intensity,
      raw.rest,
      raw.info
    );
  }
}
