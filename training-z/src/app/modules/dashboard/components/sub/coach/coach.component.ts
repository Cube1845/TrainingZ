import { Component, inject, signal, WritableSignal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Image } from 'primeng/image';
import { ExtendedUserData } from '../../../models/extended-user-data';
import { Router } from '@angular/router';
import { ProfileImageService } from '../../../services/profile-image.service';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { AppDialogService } from '../../../../common/services/app-dialog.service';
import { catchError, of } from 'rxjs';
import { AuthDataService } from '../../../../auth/services/auth-data.service';
import { CoachingService } from '../../../services/coaching.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-coach',
  imports: [Image, DividerModule, AppButtonComponent],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.scss',
})
export class CoachComponent {
  public readonly responsiveService = inject(ResponsiveService);

  private readonly router = inject(Router);
  private readonly profileImageService = inject(ProfileImageService);
  private readonly toastService = inject(AppToastService);
  private readonly dialogService = inject(AppDialogService);
  private readonly authDataService = inject(AuthDataService);
  private readonly coachingService = inject(CoachingService);

  coachData?: WritableSignal<ExtendedUserData>;

  constructor() {
    this.coachingService
      .getCoachData()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'There was an error'
          );
          return;
        }

        const coachData = result.value;

        if (coachData == null) {
          this.router.navigateByUrl('dashboard/invitation-code');
          return;
        }

        this.profileImageService
          .convertExtendedProfileImageId(coachData)
          .subscribe((convertedCoachData) => {
            this.coachData = signal<ExtendedUserData>(convertedCoachData);
          });
      });
  }

  sendMessage(): void {
    if (this.coachData == undefined) {
      return;
    }

    const messageControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(600),
    ]);

    this.dialogService
      .displayEditDialog('Send message', [
        {
          label: 'Message',
          form: messageControl,
        },
      ], 'Send')
      .subscribe((shouldSend) => {
        if (!shouldSend) {
          return;
        }

        this.coachingService
          .sendNotification(this.coachData!().id, messageControl.value || '')
          .pipe(catchError((err) => of(err)))
          .subscribe((result) => {
            if (!result.isSuccess) {
              this.toastService.error(
                result.error.message || result.message || 'There was an error'
              );
              return;
            }

            this.toastService.success('Message sent');
          });
      });
  }

  resignFromCoaching(): void {
    this.dialogService
      .displayConfirmation(
        'Are you sure?',
        'Do you want to resign from coaching?'
      )
      .subscribe(() => {
        this.coachingService
          .removeCoaching(this.authDataService.getAuthData().userId!)
          .pipe(catchError((err) => of(err)))
          .subscribe((result) => {
            if (!result.isSuccess) {
              this.toastService.error(
                result.error.message || result.message || 'There was an error'
              );
              return;
            }

            this.toastService.success('You resigned from coaching');
            this.router.navigateByUrl('dashboard/invitation-code');
          });
      });
  }
}
