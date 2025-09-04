import { Component, inject } from '@angular/core';
import { AppButtonComponent } from '../app-button/app-button.component';
import { AppInputComponent } from '../app-input/app-input.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditDialogData } from '../../models/edit-dialog-data';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  imports: [AppButtonComponent, AppInputComponent, ReactiveFormsModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent {
  private readonly ref = inject(DynamicDialogRef);
  private readonly config = inject(DynamicDialogConfig);

  editDialogData: EditDialogData[] = this.config.data.editDialogData;
  saveButtonLabel: string = this.config.data.saveButtonLabel;

  anyFormInvalid(): boolean {
    return this.editDialogData.some((x) => x.form.invalid);
  }

  closeDialog(save: boolean): void {
    this.ref.close(save);
  }
}
