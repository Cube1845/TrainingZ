import { Injectable } from '@angular/core';
import { ApiService } from '../../../common/models/api-service';
import { AuthData } from '../../models/auth-data';
import { Result } from '../../../common/models/result';

@Injectable({
  providedIn: 'root',
})
export class LoginRequestService extends ApiService<AuthData | Result> {
  constructor() {
    super('POST', 'auth/login', true);
  }
}
