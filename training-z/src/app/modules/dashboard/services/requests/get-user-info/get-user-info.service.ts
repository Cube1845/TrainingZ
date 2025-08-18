import { Injectable } from '@angular/core';
import { ApiService } from '../../../../common/models/api-service';
import { GetCodeResponse } from './get-user-info-response';
import { Result } from '../../../../common/models/result';

@Injectable({
  providedIn: 'root',
})
export class GetUserInfoService extends ApiService<Result<GetCodeResponse>> {
  constructor() {
    super('GET', 'coaching/manage/code');
  }
}
