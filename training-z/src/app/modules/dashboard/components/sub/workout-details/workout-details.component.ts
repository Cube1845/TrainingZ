import { Component, inject, OnInit, signal } from '@angular/core';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { DatePipe } from '@angular/common';
import { WorkoutsService } from '../../../../workout-dashboard/services/workouts.service';
import { ActivatedRoute } from '@angular/router';
import { WorkoutDetails } from '../../../models/workout-details';

@Component({
  selector: 'app-workout-details',
  imports: [AppButtonComponent, CardModule, AccordionModule, DatePipe],
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.scss',
})
export class WorkoutDetailsComponent implements OnInit {
  private readonly workoutsService = inject(WorkoutsService);
  private readonly route = inject(ActivatedRoute);

  workout = signal<WorkoutDetails | null>({
    id: '',
    unitName: 'Push day',
    planName: 'hahaha',
    finishedAt: new Date(),
    exercises: [
      {
        exerciseName: 'Planche',
        sets: [
          {
            index: 0,
            done: true,
            comment: '',
          },
          {
            index: 1,
            done: true,
            comment: '',
          },
          {
            index: 2,
            done: false,
            comment: '',
          },
          {
            index: 3,
            done: true,
            comment: '',
          },
        ],
      },
    ],
  });
  loading = signal(false); // change here

  ngOnInit() {
    const workoutId = this.route.snapshot.paramMap.get('id')!;
    // this.workoutsService.getWorkoutDetails(id).subscribe({
    //   next: (res) => {
    //     this.workout.set(res);
    //     this.loading.set(false);
    //   },
    // });
  }

  goBack() {
    history.back();
  }
}
