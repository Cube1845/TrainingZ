import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Image } from 'primeng/image';
import { ExtendedUserData } from '../../../models/extended-user-data';
import { DividerModule } from 'primeng/divider';
import { ProfileImageService } from '../../../services/profile-image.service';
import { AppToastService } from '../../../../common/services/app-toast.service';
import { catchError, from, map, Observable, of } from 'rxjs';
import { AppDialogService } from '../../../../common/services/app-dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment.development';
import { ProfileImageUploadDialogComponent } from '../../dialogs/profile-image-upload-dialog/profile-image-upload-dialog.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-account-settings',
  imports: [Image, DividerModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent {
  private readonly profileImageService = inject(ProfileImageService);
  private readonly toastService = inject(AppToastService);
  private readonly dialogService = inject(AppDialogService);

  private readonly userService = inject(UserService);

  userData?: WritableSignal<ExtendedUserData>;

  constructor() {
    this.userService
      .getExtendedUserData()
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
      .displayDialog(
        ProfileImageUploadDialogComponent,
        'Upload your profile picture',
        {
          acceptedFiles: 'image/*',
        }
      )
      .subscribe((imageFile) => {
        if (imageFile === null) {
          if (this.userData!().profileImageUrl == null) {
            this.toastService.error("You don't have a profile picture");
            return;
          }

          this.dialogService
            .displayConfirmation(
              'Are you sure?',
              'Do you want to remove your profile picture?'
            )
            .subscribe(() => {
              this.userService
                .deleteProfileImage()
                .pipe(catchError((err) => of(err)))
                .subscribe((result) => {
                  if (!result.isSuccess) {
                    this.toastService.error(
                      result.error.message ||
                        result.message ||
                        'There was an error'
                    );
                    return;
                  }

                  window.location.reload();
                });
            });
        }

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

          this.userService
            .updateProfileImage(imageFile)
            .pipe(catchError((err) => of(err)))
            .subscribe((result) => {
              if (!result.isSuccess) {
                this.toastService.error(
                  result.error.message || result.message || 'There was an error'
                );
                return;
              }

              window.location.reload();
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

        this.userService
          .updateName(form.value.name!, form.value.surname!)
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

        this.userService
          .updateEmail(form.value!)
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

        this.userService
          .updatePhoneNumber(form.value == '' ? null : form.value)
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
