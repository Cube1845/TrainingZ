import { Injectable } from '@angular/core';
import { ApiService } from '../../../../common/models/api-service';
import { Result } from '../../../../common/models/result';

@Injectable({
  providedIn: 'root',
})
export class UpdateNameService extends ApiService<Result> {
  constructor() {
    super('PUT', 'user/name');
  }
}
