import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '../../common/models/result';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { WorkoutsData } from '../../dashboard/models/workouts-data';
import { GetActiveTrainingPlanResponse } from '../../dashboard/services/api-responses/get-active-training-plan-response';
import { GetCurrentWorkoutResponse } from './api-responses/get-current-workout-response';
import { GetWorkoutHistoryResponse } from './api-responses/get-workout-history-response';
import { WorkoutDetails } from '../../dashboard/models/workout-details';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getWorkoutsData(): Observable<Result<WorkoutsData>> {
    return this.http.get<Result<WorkoutsData>>(
      this.apiUrl + 'workouts/workouts-data',
    );
  }

  getWorkoutHistory(
    studentId?: string | null,
  ): Observable<Result<GetWorkoutHistoryResponse>> {
    let params = new HttpParams();

    if (studentId) {
      params = params.set('studentId', studentId);
    }

    return this.http.get<Result<GetWorkoutHistoryResponse>>(
      this.apiUrl + 'workouts/history',
      { params },
    );
  }

  getActiveTrainingPlan(): Observable<Result<GetActiveTrainingPlanResponse>> {
    return this.http.get<Result<GetActiveTrainingPlanResponse>>(
      this.apiUrl + 'workouts/plan',
    );
  }

  startWorkout(trainingUnitId: string): Observable<Result> {
    const body = {
      trainingUnitId: trainingUnitId,
    };

    return this.http.post<Result>(this.apiUrl + 'workouts/start', body);
  }

  getCurrentWorkout(): Observable<Result<GetCurrentWorkoutResponse>> {
    return this.http.get<Result<GetCurrentWorkoutResponse>>(
      this.apiUrl + 'workouts/current',
    );
  }

  saveWorkout(req: any) {
    return this.http.post<Result>(this.apiUrl + 'workouts/save', req);
  }

  finishWorkout(req: any) {
    return this.http.post<Result>(this.apiUrl + 'workouts/finish', req);
  }

  getWorkoutDetails(id: string, studentId?: string | null) {
    let params = new HttpParams();

    if (studentId) {
      params = params.set('studentId', studentId);
    }

    return this.http.get(`${this.apiUrl}workouts/details/${id}`, { params });
  }
}
