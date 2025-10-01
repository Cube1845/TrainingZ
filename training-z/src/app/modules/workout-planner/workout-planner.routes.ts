import { Routes } from '@angular/router';
import { WorkoutPlannerComponent } from './components/workout-planner/workout-planner.component';

export const routes: Routes = [
  {
    path: ':id',
    component: WorkoutPlannerComponent,
    children: [],
  },
];
