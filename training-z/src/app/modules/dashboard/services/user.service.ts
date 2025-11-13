import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Result } from '../../common/models/result';
import { Observable } from 'rxjs';
import { PlainUserData } from '../models/user-data';
import { PlainExtendedUserData } from '../models/extended-user-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  getUserData(): Observable<Result<PlainUserData>> {
    return this.http.get<Result<PlainUserData>>(this.apiUrl + 'user');
  }

  getExtendedUserData(): Observable<Result<PlainExtendedUserData>> {
    return this.http.get<Result<PlainExtendedUserData>>(
      this.apiUrl + 'user/extended'
    );
  }

  updateEmail(email: string): Observable<Result> {
    return this.http.put<Result>(this.apiUrl + 'user/email', { email: email });
  }

  updateName(name: string, surname: string): Observable<Result> {
    return this.http.put<Result>(this.apiUrl + 'user/name', {
      name: name,
      surname: surname,
    });
  }

  updatePhoneNumber(phoneNumber: string | null): Observable<Result> {
    return this.http.put<Result>(this.apiUrl + 'user/phone', {
      phoneNumber: phoneNumber,
    });
  }

  deleteProfileImage(): Observable<Result> {
    return this.http.delete<Result>(this.apiUrl + 'user/profile');
  }

  updateProfileImage(imageFile: File): Observable<Result> {
    const formData = new FormData();
    formData.append('imageFile', imageFile);

    return this.http.put<Result>(this.apiUrl + 'user/profile', formData);
  }
}
