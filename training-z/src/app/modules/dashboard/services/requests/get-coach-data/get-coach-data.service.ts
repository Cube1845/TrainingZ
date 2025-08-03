import { Injectable } from '@angular/core';
import { ApiService } from '../../../../common/models/api-service';
import { PlainExtendedUserData } from '../../../models/extended-user-data';
import { Result } from '../../../../common/models/result';

@Injectable({
  providedIn: 'root',
})
export class GetCoachDataService extends ApiService<
  Result<PlainExtendedUserData | null>
> {
  constructor() {
    super('GET', 'coaching/general/coach');
  }
}
