import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileImageService {
  getUserProfileImageUrl(): string {
    return 'imgs/default_avatar.jpg';
  }
}
