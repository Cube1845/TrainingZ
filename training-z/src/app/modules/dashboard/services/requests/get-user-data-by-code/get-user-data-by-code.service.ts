import { Injectable } from '@angular/core';
import { ApiService } from '../../../../common/models/api-service';
import { Result } from '../../../../common/models/result';
import { GetUserDataByCodeResponse } from './get-user-data-by-code-response';

@Injectable({
  providedIn: 'root',
})
export class GetUserDataByCodeService extends ApiService<
  Result<GetUserDataByCodeResponse>
> {
  constructor() {
    super('GET', 'coaching/manage');
  }
}
