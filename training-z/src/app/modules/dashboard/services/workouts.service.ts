import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Result } from '../../common/models/result';
import { WorkoutsData } from '../models/workouts-data';
import { Observable } from 'rxjs';
import { GetActiveTrainingPlanResponse } from './api-responses/get-active-training-plan-response';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getWorkoutsData(): Observable<Result<WorkoutsData>> {
    return this.http.get<Result<WorkoutsData>>(
      this.apiUrl + 'workouts/workouts-data'
    );
  }

  getActiveTrainingPlan(): Observable<Result<GetActiveTrainingPlanResponse>> {
    return this.http.get<Result<GetActiveTrainingPlanResponse>>(
      this.apiUrl + 'workouts/plan'
    );
  }
}
