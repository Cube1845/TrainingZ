import { Component, inject, signal } from '@angular/core';
import { WorkoutsService } from '../../../../workout-dashboard/services/workouts.service';
import { Router } from '@angular/router';
import { WorkoutsData } from '../../../models/workouts-data';
import { catchError, of } from 'rxjs';
import { LastWorkoutData } from '../../../models/last-workout-data';
import { CardModule } from 'primeng/card';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { DatePipe } from '@angular/common';
import { AppToastService } from '../../../../common/services/app-toast.service';

@Component({
  selector: 'app-workout-history',
  imports: [CardModule, DatePipe, AppButtonComponent],
  templateUrl: './workout-history.component.html',
  styleUrl: './workout-history.component.scss',
})
export class WorkoutHistoryComponent {
  private readonly workoutsService = inject(WorkoutsService);
  private readonly router = inject(Router);
  private readonly toastService = inject(AppToastService);

  data = signal<LastWorkoutData[] | null>(null);

  constructor() {
    this.workoutsService
      .getWorkoutHistory()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Invalid id',
          );
          return;
        }

        this.data.set(result.value.workouts);
      });
  }

  workouts(): LastWorkoutData[] {
    return this.data() ?? [];
  }

  openWorkout(id: string) {
    this.router.navigateByUrl('dashboard/workout-details/' + id);
  }

  goBack() {
    history.back();
  }
}
