import { Component, inject, signal, WritableSignal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Image } from 'primeng/image';
import { ExtendedUserData } from '../../../models/extended-user-data';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GetCoachDataService } from '../../../services/requests/get-coach-data/get-coach-data.service';
import { ProfileImageService } from '../../../services/profile-image.service';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { RemoveCoachingService } from '../../../services/requests/remove-coaching/remove-coaching.service';
import { AppDialogService } from '../../../../common/services/app-dialog.service';
import { catchError, of } from 'rxjs';

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

  private readonly getCoachDataRequest = inject(GetCoachDataService);
  private readonly removeCoachingRequest = inject(RemoveCoachingService);

  coachData?: WritableSignal<ExtendedUserData>;

  constructor() {
    this.getCoachDataRequest
      .request()
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

  resignFromCoaching(): void {
    this.dialogService
      .displayConfirmation(
        'Are you sure?',
        'Do you want to resign from coaching?'
      )
      .subscribe(() => {
        this.removeCoachingRequest
          .request({ studentId: null })
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
