import { Component } from '@angular/core';
import { AppInputComponent } from '../../../common/components/app-input/app-input.component';
import { AppButtonComponent } from '../../../common/components/app-button/app-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [AppInputComponent, AppButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
