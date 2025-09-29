import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoachingService } from '../../../services/coaching.service';
import { ProfileImageService } from '../../../services/profile-image.service';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { catchError, of } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { ExtendedUserData } from '../../../models/extended-user-data';

@Component({
  selector: 'app-student-manage',
  imports: [DividerModule, ImageModule],
  templateUrl: './student-manage.component.html',
  styleUrl: './student-manage.component.scss',
})
export class StudentManageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly coachingService = inject(CoachingService);
  private readonly profileImageService = inject(ProfileImageService);
  private readonly toastService = inject(AppToastService);

  studentId: string = '';

  studentData = signal<ExtendedUserData | undefined>(undefined);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.studentId = params['id'];

      this.coachingService
        .getStudentData(this.studentId)
        .pipe(catchError((err) => of(err)))
        .subscribe((result) => {
          if (!result.isSuccess) {
            this.toastService.error(
              result.error.message || result.message || 'Invalid code'
            );
            return;
          }

          this.profileImageService
            .convertExtendedProfileImageId(result.value)
            .subscribe((userData) => {
              this.studentData.set(userData);
            });
        });
    });
  }
}
