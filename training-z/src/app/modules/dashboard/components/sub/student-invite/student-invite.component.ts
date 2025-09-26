import { Component, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { UserData } from '../../../models/user-data';
import { AppInputComponent } from '../../../../common/components/app-input/app-input.component';
import { Image } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileImageService } from '../../../services/profile-image.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { UserInfo } from '../../../models/user-info';
import { CoachingService } from '../../../services/coaching.service';

@Component({
  selector: 'app-student-invite',
  imports: [
    AppButtonComponent,
    AppInputComponent,
    Image,
    DividerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './student-invite.component.html',
  styleUrl: './student-invite.component.scss',
})
export class StudentInviteComponent {
  public readonly responsiveService = inject(ResponsiveService);

  private readonly profileImageService = inject(ProfileImageService);
  private readonly router = inject(Router);
  private readonly toastService = inject(AppToastService);

  private readonly coachingService = inject(CoachingService);

  code = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  invitedUserData = signal<UserData | undefined>(undefined);
  userInfo = signal<UserInfo | undefined>(undefined);

  findStudent(): void {
    this.coachingService
      .getUserDataByCode(this.code.value!)
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Invalid code'
          );
          return;
        }

        this.profileImageService
          .convertProfileImageId(result.value.userData)
          .subscribe((userData) => {
            this.invitedUserData.set(userData);
            this.userInfo.set(result.value.userInfo);
          });
      });
  }

  rejectStudent(): void {
    this.router.navigateByUrl('dashboard/students');
  }

  acceptStudent(): void {
    this.coachingService
      .addCoaching(this.invitedUserData()!.id)
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        this.router.navigateByUrl('dashboard/students');

        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Invalid user'
          );
          return;
        }

        this.toastService.success('Added new student');
      });
  }
}
