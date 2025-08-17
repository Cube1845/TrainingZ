import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-file-uploader',
  imports: [ButtonModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true,
    },
  ],
})
export class FileUploaderComponent implements ControlValueAccessor {
  private onChange!: (value: any) => void;

  uuid = uuidv4();

  acceptedFiles = input<string>();

  selectedFile = signal<File | null>(null);

  uploaderDisabled = signal<boolean>(false);

  async onUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files![0];

    if (!file) {
      console.error('File error');
      return;
    }

    this.selectedFile.set(file);
    this.onChange(this.selectedFile());
  }

  getFileUploaderContentText = computed(() => {
    if (this.selectedFile() == null) {
      return 'Upload picture';
    }

    return this.selectedFile()!.name;
  });

  writeValue(obj: any): void {
    this.selectedFile.set(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
