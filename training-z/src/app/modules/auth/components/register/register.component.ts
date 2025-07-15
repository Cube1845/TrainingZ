import { Component, inject } from '@angular/core';
import { AppButtonComponent } from '../../../common/components/app-button/app-button.component';
import { AppInputComponent } from '../../../common/components/app-input/app-input.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordsMatchValidator } from './passwordsMatchValidator';
import { RegisterRequestService } from '../../services/register/register-request.service';
import { AppToastService } from '../../../common/services/app-toast.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { RegisterRequest } from '../../services/register/register-request';
import { Role } from '../../models/role';

@Component({
  selector: 'app-register',
  imports: [
    AppButtonComponent,
    AppInputComponent,
    RouterLink,
    ReactiveFormsModule,
    ToggleSwitchModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly registerRequest = inject(RegisterRequestService);
  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);

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
      trainerAccount: new FormControl<boolean>(false),
    },
    passwordsMatchValidator
  );

  register(): void {
    const body: RegisterRequest = {
      email: this.data.value.email!,
      password: this.data.value.password!,
      role: this.data.value.trainerAccount ? Role.Trainer : Role.User,
    };

    this.registerRequest.request(body).subscribe((result) => {
      if (result.isSuccess) {
        this.toastService.success('Registered! Now log in');
        this.router.navigateByUrl('auth');
        return;
      }

      this.toastService.error(result.message || 'Failed to register');
    });
  }
}
