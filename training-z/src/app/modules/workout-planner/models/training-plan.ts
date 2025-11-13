import { TrainingUnit } from './training-unit';

export class TrainingPlan {
  id: string;
  name: string;
  trainingUnits: TrainingUnit[];
  isActive: boolean;

  constructor(
    id: string,
    name: string,
    trainingUnits: TrainingUnit[],
    isActive: boolean
  ) {
    this.id = id;
    this.name = name;
    this.trainingUnits = trainingUnits;
    this.isActive = isActive;
  }
}
