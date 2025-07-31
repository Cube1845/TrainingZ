import { inject, Injectable } from '@angular/core';
import { PlainUserData, UserData } from '../models/user-data';

import { ImageService } from '../../common/services/image.service';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import {
  ExtendedUserData,
  PlainExtendedUserData,
} from '../models/extended-user-data';

@Injectable({
  providedIn: 'root',
})
export class ProfileImageService {
  private readonly imageService = inject(ImageService);

  private readonly defaultProfileImageUrl = environment.defaultProfileImageUrl;

  getUserProfileImageUrl(imageId: string | null): Observable<string> {
    return imageId == null
      ? of(this.defaultProfileImageUrl)
      : this.imageService.getImageFromApi(imageId).pipe(
          map((blob) => {
            if (blob) {
              const imageFile = new File([blob], 'Image', {
                type: blob.type,
              });

              const imageUrl = URL.createObjectURL(imageFile);
              return imageUrl;
            } else {
              return this.defaultProfileImageUrl;
            }
          })
        );
  }

  convertProfileImageId(plainUserData: PlainUserData): Observable<UserData> {
    return this.getUserProfileImageUrl(plainUserData.profileImageId).pipe(
      map((imageUrl) => {
        const userData: UserData = {
          id: plainUserData.id,
          name: plainUserData.name,
          surname: plainUserData.surname,
          profileImageUrl: imageUrl,
        };

        return userData;
      })
    );
  }

  convertExtendedProfileImageId(
    plainExtendedUserData: PlainExtendedUserData
  ): Observable<ExtendedUserData> {
    return this.getUserProfileImageUrl(
      plainExtendedUserData.profileImageId
    ).pipe(
      map((imageUrl) => {
        const userData: ExtendedUserData = {
          id: plainExtendedUserData.id,
          name: plainExtendedUserData.name,
          surname: plainExtendedUserData.surname,
          email: plainExtendedUserData.email,
          phoneNumber: plainExtendedUserData.phoneNumber,
          profileImageUrl: imageUrl,
        };

        return userData;
      })
    );
  }
}
