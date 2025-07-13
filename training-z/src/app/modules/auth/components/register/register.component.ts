import { Component } from '@angular/core';
import { AppButtonComponent } from '../../../common/components/app-button/app-button.component';
import { AppInputComponent } from '../../../common/components/app-input/app-input.component';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordsMatchValidator } from './passwordsMatchValidator';

@Component({
  selector: 'app-register',
  imports: [
    AppButtonComponent,
    AppInputComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  data = new FormGroup(
    {
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    passwordsMatchValidator
  );
}
