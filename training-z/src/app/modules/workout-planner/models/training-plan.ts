import { TrainingUnit } from './training-unit';

export class TrainingPlan {
  id: string;
  name: string;
  trainingUnits: TrainingUnit[];

  constructor(id: string, name: string, trainingUnits: TrainingUnit[]) {
    this.id = id;
    this.name = name;
    this.trainingUnits = trainingUnits;
  }
}
