import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  public getImageFromApi(imageId: string | null): Observable<Blob | null> {
    return imageId == null
      ? of(null)
      : this.http.get(this.apiUrl + 'image?imageId=' + imageId, {
          responseType: 'blob',
        });
  }
}
