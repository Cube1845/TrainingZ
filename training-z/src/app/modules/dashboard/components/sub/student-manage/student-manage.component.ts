import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoachingService } from '../../../services/coaching.service';
import { ProfileImageService } from '../../../services/profile-image.service';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { StudentManageData } from '../../../models/student-manage-data';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-student-manage',
  imports: [DividerModule, ImageModule, AppButtonComponent],
  templateUrl: './student-manage.component.html',
  styleUrl: './student-manage.component.scss',
})
export class StudentManageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly coachingService = inject(CoachingService);
  private readonly profileImageService = inject(ProfileImageService);
  private readonly toastService = inject(AppToastService);

  studentId: string = '';

  studentData = signal<StudentManageData | undefined>({
    studentData: {
      name: 'Adrian',
      surname: 'Down',
      profileImageUrl: environment.defaultProfileImageUrl,
      id: 'awdawdawd',
      phoneNumber: null,
      email: 'user@test.pl',
    },
    trainingPlans: [],
    lastWorkouts: [],
  });

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.studentId = params['id'];

      // this.coachingService
      //   .getStudentManageData(this.studentId)
      //   .pipe(catchError((err) => of(err)))
      //   .subscribe((result) => {
      //     if (!result.isSuccess) {
      //       this.toastService.error(
      //         result.error.message || result.message || 'Invalid code'
      //       );
      //       return;
      //     }

      //     this.profileImageService
      //       .convertExtendedProfileImageId(result.value)
      //       .subscribe((userData) => {
      //         this.studentData.set(userData);
      //       });
      //   });
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
  }
}
