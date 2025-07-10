import { Component, forwardRef, input, OnDestroy, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';

var inputId = 0;

@Component({
  selector: 'app-input',
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FloatLabelModule,
    PasswordModule,
  ],
  templateUrl: './app-input.component.html',
  styleUrl: './app-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputComponent),
      multi: true,
    },
  ],
})
export class AppInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  onChange!: (value: string) => void;

  id = input(`ws-input-${++inputId}`);
  label = input<string | null>(null);
  type = input<'text' | 'password' | 'number'>('text');

  form = new FormControl<string | null>('');

  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.form.valueChanges.subscribe((value) => {
      if (this.onChange) {
        this.onChange(value || '');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }

  writeValue(obj: any): void {
    this.form.setValue(obj || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
