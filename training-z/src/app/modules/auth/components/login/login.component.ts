import { Component, inject } from '@angular/core';
import { AppInputComponent } from '../../../common/components/app-input/app-input.component';
import { AppButtonComponent } from '../../../common/components/app-button/app-button.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginRequestService } from '../../services/login/login-request.service';
import { AuthDto } from '../../models/auth-dto';
import { AppToastService } from '../../../common/services/app-toast.service';
import { AuthDataService } from '../../services/auth-data.service';
import { Result } from '../../../common/models/result';
import { AuthData } from '../../models/auth-data';

@Component({
  selector: 'app-login',
  imports: [
    AppInputComponent,
    AppButtonComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly loginRequest = inject(LoginRequestService);
  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly authDataService = inject(AuthDataService);

  data = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  login(): void {
    const body: AuthDto = {
      email: this.data.value.email!,
      password: this.data.value.password!,
    };

    this.loginRequest.request(body).subscribe({
      next: (data) => {
        if (this.isAuthData(data)) {
          this.authDataService.setAuthData(data);
          this.router.navigateByUrl('');
        }
      },
      error: (data) => {
        this.toastService.error(data.error.message || 'Failed to log in');
      },
    });
  }

  private isAuthData(obj: any): obj is AuthData {
    return obj.userId != null;
  }
}
