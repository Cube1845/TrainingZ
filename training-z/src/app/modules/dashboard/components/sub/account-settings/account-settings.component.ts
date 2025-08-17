import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Image } from 'primeng/image';
import { ExtendedUserData } from '../../../models/extended-user-data';
import { DividerModule } from 'primeng/divider';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { ResponsiveService } from '../../../../common/services/responsive.service';
import { GetExtendedUserDataService } from '../../../services/requests/get-extended-user-data/get-extended-user-data.service';
import { ProfileImageService } from '../../../services/profile-image.service';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { catchError, from, map, Observable, of } from 'rxjs';
import { AppDialogService } from '../../../../common/services/app-dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateEmailService } from '../../../services/requests/update-email/update-email.service';
import { UpdateNameService } from '../../../services/requests/update-name/update-name.service';
import { UpdatePhoneService } from '../../../services/requests/update-phone/update-phone.service';
import { FileUploadDialogComponent } from '../../../../common/components/file-upload-dialog/file-upload-dialog.component';
import { environment } from '../../../../../../environments/environment.development';
import { UpdateProfileImageService } from '../../../services/requests/update-profile-image/update-profile-image.service';

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

  private readonly getExtendedUserDataRequest = inject(
    GetExtendedUserDataService
  );
  private readonly updateEmailRequest = inject(UpdateEmailService);
  private readonly updateNameRequest = inject(UpdateNameService);
  private readonly updatePhoneRequest = inject(UpdatePhoneService);
  private readonly updateProfileImageRequest = inject(
    UpdateProfileImageService
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

  editProfileImage(): void {
    this.dialogService
      .displayDialog(FileUploadDialogComponent, 'Upload your profile picture', {
        acceptedFiles: 'image/*',
      })
      .subscribe((imageFile) => {
        if (!imageFile) {
          return;
        }

        if (!this.isFile(imageFile)) {
          return;
        }

        this.isImageValid(imageFile).subscribe((result) => {
          if (!result) {
            this.toastService.error(
              'The image must be in 1:1 ratio and cant be larger than 1440px.'
            );
            return;
          }

          const formData = new FormData();
          formData.append('imageFile', imageFile);

          this.updateProfileImageRequest.requestFormData!(formData)
            .pipe(catchError((err) => of(err)))
            .subscribe((result) => {
              if (!result.isSuccess) {
                this.toastService.error(
                  result.error.message || result.message || 'There was an error'
                );
                return;
              }

              this.toastService.success('Profile picture changed');
            });
        });
      });
  }

  // Method does not make sense but the logic will not pass here anything else than the File type
  private isFile(obj: any): obj is File {
    return true;
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

        this.updateNameRequest
          .request({ name: form.value.name!, surname: form.value.surname! })
          .pipe(catchError((err) => of(err)))
          .subscribe((result) => {
            if (!result.isSuccess) {
              this.toastService.error(
                result.error.message || result.message || 'There was an error'
              );
              return;
            }

            this.userData?.update((x) => {
              x.name = form.value.name!;
              x.surname = form.value.surname!;
              return x;
            });

            this.toastService.success('Saved');
          });
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

        this.updateEmailRequest
          .request({ email: form.value })
          .pipe(catchError((err) => of(err)))
          .subscribe((result) => {
            if (!result.isSuccess) {
              this.toastService.error(
                result.error.message || result.message || 'There was an error'
              );
              return;
            }

            this.userData?.update((x) => {
              x.email = form.value!;
              return x;
            });

            this.toastService.success('Saved');
          });
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

        this.updatePhoneRequest
          .request({ email: form.value == '' ? null : form.value })
          .pipe(catchError((err) => of(err)))
          .subscribe((result) => {
            if (!result.isSuccess) {
              this.toastService.error(
                result.error.message || result.message || 'There was an error'
              );
              return;
            }

            this.userData?.update((x) => {
              x.phoneNumber = form.value == '' ? null : form.value;
              return x;
            });

            this.toastService.success('Saved');
          });
      });
  }

  private isImageValid(imageFile: File): Observable<boolean> {
    return from(createImageBitmap(imageFile)).pipe(
      map((bitmap) => {
        const width = bitmap.width;
        const height = bitmap.height;

        const minSize = 16;
        const maxSize = environment.maxProfileImageSize;

        return width == height && width >= minSize && width <= maxSize;
      })
    );
  }
}
