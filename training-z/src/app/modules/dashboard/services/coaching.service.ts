import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Result } from '../../common/models/result';
import { PlainExtendedUserData } from '../models/extended-user-data';
import { GetStudentsResponse } from './api-responses/get-students-response';
import { GetUserDataByCodeResponse } from './api-responses/get-user-data-by-code-response';
import { GetCodeResponse } from './api-responses/get-user-info-response';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root',
})
export class CoachingService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  addCoaching(userId: string): Observable<Result> {
    return this.http.post<Result>(this.apiUrl + 'coaching/manage', {
      userId: userId,
    });
  }

  getCoachData(): Observable<Result<PlainExtendedUserData | null>> {
    return this.http.get<Result<PlainExtendedUserData | null>>(
      this.apiUrl + 'coaching/general/coach'
    );
  }

  getStudents(): Observable<Result<GetStudentsResponse>> {
    return this.http.get<Result<GetStudentsResponse>>(
      this.apiUrl + 'coaching/general/students'
    );
  }

  getUserDataByCode(
    code: string
  ): Observable<Result<GetUserDataByCodeResponse>> {
    return this.http.get<Result<GetUserDataByCodeResponse>>(
      this.apiUrl + 'coaching/manage/' + code
    );
  }

  getUserInfo(): Observable<Result<GetCodeResponse>> {
    return this.http.get<Result<GetCodeResponse>>(
      this.apiUrl + 'coaching/manage/code'
    );
  }

  removeCoaching(studentId: string): Observable<Result> {
    return this.http.delete<Result>(
      this.apiUrl + 'coaching/manage/' + studentId
    );
  }

  updateUserInfo(
    userInfo: Partial<{
      goals: string | null;
      sleepDiet: string | null;
      activity: string | null;
      injuries: string | null;
      timeAvaiable: string | null;
      other: string | null;
    }>
  ): Observable<Result> {
    return this.http.put<Result>(this.apiUrl + 'user/info', userInfo);
  }
}
