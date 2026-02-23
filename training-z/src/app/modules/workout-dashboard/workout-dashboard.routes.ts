import { Routes } from '@angular/router';
import { WorkoutDashboardComponent } from './components/workout-dashboard/workout-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: WorkoutDashboardComponent,
    children: [],
  },
];
