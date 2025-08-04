import { Injectable } from '@angular/core';
import { ApiService } from '../../../../common/models/api-service';
import { PlainUserData } from '../../../models/user-data';
import { Result } from '../../../../common/models/result';

@Injectable({
  providedIn: 'root',
})
export class GetUserDataByCodeService extends ApiService<
  Result<PlainUserData>
> {
  constructor() {
    super('GET', 'coaching/manage');
  }
}
