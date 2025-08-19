import { Component, inject } from '@angular/core';
import { FileUploaderComponent } from '../../../../common/components/file-uploader/file-uploader.component';
import { AppButtonComponent } from '../../../../common/components/app-button/app-button.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-profile-image-upload-dialog',
  imports: [FileUploaderComponent, AppButtonComponent, ReactiveFormsModule],
  templateUrl: './profile-image-upload-dialog.component.html',
  styleUrl: './profile-image-upload-dialog.component.scss',
})
export class ProfileImageUploadDialogComponent {
  private readonly ref = inject(DynamicDialogRef);
  private readonly config = inject(DynamicDialogConfig);

  acceptedFiles = this.config.data?.acceptedFiles || '';

  fileForm = new FormControl<File | null>(null, Validators.required);

  closeDialog(sendFile: boolean): void {
    this.ref.close(sendFile ? this.fileForm.value : undefined);
  }
}
