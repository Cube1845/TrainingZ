import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth-data';
import { Role, ROLE_TRAINER, ROLE_USER } from '../models/roles';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  setAuthData(data: AuthData): void {
    localStorage.setItem('userId', data.userId!);
    localStorage.setItem('accessToken', data.accessToken!);
    localStorage.setItem('accessExpiryDateTime', data.accessExpiryDateTime!);
    localStorage.setItem('refreshToken', data.refreshToken!);
    localStorage.setItem(
      'role',
      data.role == Role.Trainer ? ROLE_TRAINER : ROLE_USER
    );
  }

  clearAuthData(): void {
    localStorage.clear();
  }

  getAuthData(): AuthData {
    const role = localStorage.getItem('role')!;

    const data: AuthData = {
      userId: localStorage.getItem('userId'),
      accessToken: localStorage.getItem('accessToken'),
      accessExpiryDateTime: localStorage.getItem('accessExpiryDateTime'),
      refreshToken: localStorage.getItem('refreshToken'),
      role: role == ROLE_TRAINER ? Role.Trainer : Role.User,
    };

    return data;
  }

  isAuthDataSet(): boolean {
    return (
      localStorage.getItem('userId') != null &&
      localStorage.getItem('accessToken') != null &&
      localStorage.getItem('accessExpiryDateTime') != null &&
      localStorage.getItem('refreshToken') != null &&
      localStorage.getItem('role') != null
    );
  }
}
