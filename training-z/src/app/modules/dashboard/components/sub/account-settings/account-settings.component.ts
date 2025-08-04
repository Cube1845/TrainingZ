import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Image } from 'primeng/image';
import { ExtendedUserData } from '../../../models/extended-user-data';
import { DividerModule } from 'primeng/divider';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { GetExtendedUserDataService } from '../../../services/requests/get-extended-user-data/get-extended-user-data.service';
import { ProfileImageService } from '../../../services/profile-image.service';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  imports: [Image, DividerModule, AppButtonComponent],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent {
  public readonly responsiveService = inject(ResponsiveService);

  private readonly profileImageService = inject(ProfileImageService);
  private readonly toastService = inject(AppToastService);

  public readonly getExtendedUserDataRequest = inject(
    GetExtendedUserDataService
  );

  userData?: WritableSignal<ExtendedUserData>;

  constructor() {
    this.getExtendedUserDataRequest
      .request()
      .pipe(catchError((err) => of(err)))
      .subscribe((result) => {
        if (!result.isSuccess) {
          this.toastService.error(
            result.error.message || result.message || 'There was an error'
          );
          return;
        }

        this.profileImageService
          .convertExtendedProfileImageId(result.value)
          .subscribe((userData) => {
            this.userData = signal<ExtendedUserData>(userData);
          });
      });
  }
}
