import { Injectable } from '@angular/core';
import { Result } from '../../../../common/models/result';
import { ApiService } from '../../../../common/models/api-service';

@Injectable({
  providedIn: 'root',
})
export class UpdateEmailService extends ApiService<Result> {
  constructor() {
    super('PUT', 'user/email');
  }
}
