import { Injectable } from '@angular/core';
import { ApiService } from '../../../../common/models/api-service';
import { Result } from '../../../../common/models/result';
import { PlainExtendedUserData } from '../../../models/extended-user-data';

@Injectable({
  providedIn: 'root',
})
export class GetExtendedUserDataService extends ApiService<
  Result<PlainExtendedUserData>
> {
  constructor() {
    super('GET', 'user/extended');
  }
}
