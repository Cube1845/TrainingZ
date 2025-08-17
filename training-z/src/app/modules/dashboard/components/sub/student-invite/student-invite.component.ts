import { Component, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { UserData } from '../../../models/user-data';
import { AppInputComponent } from '../../../../common/components/app-input/app-input.component';
import { Image } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetUserDataByCodeService } from '../../../services/requests/get-user-data-by-code/get-user-data-by-code.service';
import { ProfileImageService } from '../../../services/profile-image.service';
import { Router } from '@angular/router';
import { AddCoachingService } from '../../../services/requests/add-coaching/add-coaching.service';
import { catchError, of } from 'rxjs';

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

  private readonly getUserDataRequest = inject(GetUserDataByCodeService);
  private readonly addCoachingRequest = inject(AddCoachingService);

  private readonly profileImageService = inject(ProfileImageService);
  private readonly router = inject(Router);
  private readonly toastService = inject(AppToastService);

  code = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  invitedUserData = signal<UserData | null>(null);

  findStudent(): void {
    this.getUserDataRequest
      .request({ code: this.code.value! })
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'Invalid code'
          );
          return;
        }

        this.profileImageService
          .convertProfileImageId(result.value)
          .subscribe((userData) => this.invitedUserData.set(userData));
      });
  }

  rejectStudent(): void {
    this.router.navigateByUrl('dashboard/students');
  }

  acceptStudent(): void {
    this.addCoachingRequest
      .request({ userId: this.invitedUserData()!.id })
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
