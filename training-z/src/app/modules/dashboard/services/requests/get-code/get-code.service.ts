import { Injectable } from '@angular/core';
import { ApiService } from '../../../../common/models/api-service';
import { GetCodeResponse } from './get-code-response';
import { Result } from '../../../../common/models/result';

@Injectable({
  providedIn: 'root',
})
export class GetCodeService extends ApiService<Result<GetCodeResponse>> {
  constructor() {
    super('GET', 'coaching/invite/code');
  }
}
