import { IntensityType } from './enums/intensity-type';

export class Exercise {
  id: string;
  exercise: string;
  sets: string;
  reps: string;
  intensityType: IntensityType;
  intensity: string;
  rest: string;
  info: string | null;

  constructor(
    id: string,
    exercise: string,
    sets: string,
    reps: string,
    intensityType: IntensityType,
    intensity: string,
    rest: string,
    info: string | null
  ) {
    this.id = id;
    this.exercise = exercise;
    this.sets = sets;
    this.reps = reps;
    this.intensityType = intensityType;
    this.intensity = intensity;
    this.rest = rest;
    this.info = info;
  }
}
