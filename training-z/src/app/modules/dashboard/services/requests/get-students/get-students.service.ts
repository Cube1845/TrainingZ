import { Injectable } from '@angular/core';
import { ApiService } from '../../../../common/models/api-service';
import { GetStudentsResponse } from './get-students-response';
import { Result } from '../../../../common/models/result';

@Injectable({
  providedIn: 'root',
})
export class GetStudentsService extends ApiService<
  Result<GetStudentsResponse>
> {
  constructor() {
    super('GET', 'coaching/general/students');
  }
}
