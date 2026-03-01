import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Result } from '../../common/models/result';
import { PlainExtendedUserData } from '../models/extended-user-data';
import { GetStudentsResponse } from './api-responses/get-students-response';
import { GetUserDataByCodeResponse } from './api-responses/get-user-data-by-code-response';
import { GetCodeResponse } from './api-responses/get-user-info-response';
import { PlainStudentManageData } from '../models/student-manage-data';
import { CreateTrainingPlanResponse } from './api-responses/create-training-plan-response';
import { WorkoutsData } from '../models/workouts-data';
import { GetNotificationsResponse } from './api-responses/get-notifications-response';

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

  getStudentManageData(
    studentId: string
  ): Observable<Result<PlainStudentManageData>> {
    return this.http.get<Result<PlainStudentManageData>>(
      this.apiUrl + 'coaching/general/student-data/' + studentId
    );
  }

  createTrainingPlan(
    studentId: string
  ): Observable<Result<CreateTrainingPlanResponse>> {
    const body = {
      studentId: studentId,
    };

    return this.http.post<Result<CreateTrainingPlanResponse>>(
      this.apiUrl + 'coaching/general/plan',
      body
    );
  }

  deleteTrainingPlan(planId: string): Observable<Result> {
    return this.http.delete<Result>(
      this.apiUrl + 'coaching/general/plan/' + planId
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


  sendNotification(receiverId: string, message: string): Observable<Result> {
    return this.http.post<Result>(this.apiUrl + 'notifications', {
      receiverId: receiverId,
      message: message,
    });
  }

  getNotifications(): Observable<Result<GetNotificationsResponse>> {
    return this.http.get<Result<GetNotificationsResponse>>(
      this.apiUrl + 'notifications'
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
