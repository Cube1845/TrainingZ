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
import { AppDialogService } from '../../../../common/services/app-dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  private readonly dialogService = inject(AppDialogService);

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

  editName(): void {
    var form = new FormGroup({
      name: new FormControl<string>(this.userData!().name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(16),
      ]),
      surname: new FormControl<string>(this.userData!().surname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(16),
      ]),
    });

    this.dialogService
      .displayEditDialog('Edit your name', [
        { label: 'Name', form: form.controls.name },
        { label: 'Surname', form: form.controls.surname },
      ])
      .subscribe((save) => {
        if (!save) {
          return;
        }

        //api call

        this.toastService.success('Saved');
      });
  }

  editEmail(): void {
    var form = new FormControl<string>(this.userData!().email, [
      Validators.required,
      Validators.email,
    ]);

    this.dialogService
      .displayEditDialog('Edit your email', [{ label: 'Email', form: form }])
      .subscribe((save) => {
        if (!save) {
          return;
        }

        //api call

        this.toastService.success('Saved');
      });
  }

  editPhoneNumber(): void {
    var form = new FormControl<string | null>(this.userData!().phoneNumber, [
      Validators.minLength(9),
      Validators.maxLength(13),
    ]);

    this.dialogService
      .displayEditDialog('Edit your phone number', [
        { label: 'Phone number (optional)', form: form },
      ])
      .subscribe((save) => {
        if (!save) {
          return;
        }

        //api call

        this.toastService.success('Saved');
      });
  }
}
