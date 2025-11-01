import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Result } from '../../common/models/result';
import { TrainingPlan } from '../models/training-plan';
import { ExerciseType } from '../models/enums/exercise-type';
import { Combo } from '../models/combo';
import { GetTrainingPlanResponse } from './api-responses/get-training-plan-response';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  private readonly emptyGuid = '00000000-0000-0000-0000-000000000000';

  getTrainingPlan(id: string): Observable<Result<GetTrainingPlanResponse>> {
    return this.http.get<Result<GetTrainingPlanResponse>>(
      this.apiUrl + 'coaching/planner/' + id
    );
  }

  saveTrainingPlan(plan: TrainingPlan): Observable<Result> {
    const body = {
      plan: {
        id: plan.id == '' ? this.emptyGuid : plan.id,
        name: plan.name,
        isActive: plan.isActive,
        trainingUnits: plan.trainingUnits.map((u) => {
          return {
            id: u.id == '' ? this.emptyGuid : u.id,
            name: u.name,
            trainingSections: u.trainingSections.map((s, i0) => {
              return {
                id: s.id == '' ? this.emptyGuid : s.id,
                name: s.name,
                index: i0,
                exercises: s.exercises.map((e, i1) => {
                  return {
                    ...e,
                    name: this.isCombo(e.name, e.exerciseType)
                      ? e.name.join(environment.comboSplitChar)
                      : e.name,
                    id: e.id == '' ? this.emptyGuid : e.id,
                    index: i1,
                  };
                }),
              };
            }),
          };
        }),
      },
    };

    return this.http.put<Result>(this.apiUrl + 'coaching/planner', body);
  }

  private isCombo(obj: string | Combo, et: ExerciseType): obj is Combo {
    return et == ExerciseType.Combo;
  }
}
