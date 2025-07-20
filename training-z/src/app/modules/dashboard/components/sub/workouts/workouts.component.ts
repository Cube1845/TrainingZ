import { Component, signal } from '@angular/core';
import { WorkoutPlan } from '../../../models/workoutPlan';

@Component({
  selector: 'app-workouts',
  imports: [],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent {
  workoutPlans = signal<WorkoutPlan[]>([
    {
      id: 'awdawdafawga=-awfawf',
      name: 'Workout 1',
      author: 'Jan Brzechwa',
      createdAt: new Date(),
      lastUpdate: new Date(),
    },
  ]);
}
