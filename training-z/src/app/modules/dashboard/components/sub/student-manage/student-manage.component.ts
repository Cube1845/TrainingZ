import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachingService } from '../../../services/coaching.service';
import { ProfileImageService } from '../../../services/profile-image.service';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { StudentManageData } from '../../../models/student-manage-data';
import { environment } from '../../../../../../environments/environment.development';
import { catchError, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AppDialogService } from '../../../../common/services/app-dialog.service';

@Component({
  selector: 'app-student-manage',
  imports: [DividerModule, ImageModule, AppButtonComponent, DatePipe],
  templateUrl: './student-manage.component.html',
  styleUrl: './student-manage.component.scss',
})
export class StudentManageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly coachingService = inject(CoachingService);
  private readonly profileImageService = inject(ProfileImageService);
  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly dialogService = inject(AppDialogService);

  studentId: string = '';

  studentData = signal<StudentManageData | undefined>(undefined);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.studentId = params['id'];

      this.coachingService
        .getStudentManageData(this.studentId)
        .pipe(catchError((err) => of(err)))
        .subscribe((result) => {
          if (!result.isSuccess) {
            this.toastService.error(
              result.error.message || result.message || 'Invalid data'
            );
            return;
          }

          this.profileImageService
            .convertExtendedProfileImageId(result.value.studentData)
            .subscribe((userData) => {
              this.studentData.set({
                studentData: userData,
                trainingPlans: result.value.trainingPlans,
                lastWorkouts: result.value.lastWorkouts,
              });
            });
        });
    });
  }

  createWorkoutPlan(): void {
    if (
      this.studentData()!.trainingPlans.length >=
      environment.maxTrainingPlansPerStudent
    ) {
      this.toastService.error(
        'You can only have up to 2 training plans per student at the same time'
      );
      return;
    }

    this.coachingService
      .createTrainingPlan(this.studentId)
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Invalid id'
          );
          return;
        }

        this.router.navigateByUrl(
          'workout-planner/' + result.value.trainingPlanId
        );
      });
  }

  deleteWorkoutPlan(event: Event, planIndex: number): void {
    event.stopPropagation();

    this.dialogService
      .displayConfirmation(
        'Are you sure?',
        'Do you want to delete this training plan (all data related to this plan will also be deleted, e. g. done workouts)?'
      )
      .subscribe(() => {
        this.coachingService
          .deleteTrainingPlan(this.studentData()!.trainingPlans[planIndex].id)
          .pipe(catchError((err) => of(err)))
          .subscribe((result) => {
            if (!result.isSuccess) {
              this.toastService.error(
                result.error.message || result.message || 'Invalid id'
              );
              return;
            }

            this.toastService.success('You removed this training plan');
            location.reload();
          });
      });
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
