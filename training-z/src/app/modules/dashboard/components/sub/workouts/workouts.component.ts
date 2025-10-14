import { Component, signal } from '@angular/core';
import { WorkoutPlan } from '../../../models/workoutPlan';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-workouts',
  imports: [DatePipe],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent {
  workoutPlans = signal<WorkoutPlan[]>([
    {
      id: 'awdawdafawga=-awfawf',
      name: 'Workout 1',
      createdAt: new Date(),
      lastUpdate: new Date(),
    },
  ]);
}
