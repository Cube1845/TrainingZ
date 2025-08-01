import { Injectable } from '@angular/core';
import { ApiService } from '../../../../common/models/api-service';
import { Result } from '../../../../common/models/result';

@Injectable({
  providedIn: 'root'
})
export class AddCoachingService extends ApiService<Result> {
  constructor() {
    super('POST', 'coaching/manage');
  }
}
