import { Component, inject } from '@angular/core';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { AppButtonComponent } from '../app-button/app-button.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-upload-dialog',
  imports: [FileUploaderComponent, AppButtonComponent, ReactiveFormsModule],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss',
})
export class FileUploadDialogComponent {
  private readonly ref = inject(DynamicDialogRef);
  private readonly config = inject(DynamicDialogConfig);

  acceptedFiles = this.config.data?.acceptedFiles || '';

  fileForm = new FormControl<File | null>(null, Validators.required);

  closeDialog(sendFile: boolean): void {
    this.ref.close(
      sendFile
        ? this.fileForm.value == null
          ? undefined
          : this.fileForm.value
        : undefined
    );
  }
}
