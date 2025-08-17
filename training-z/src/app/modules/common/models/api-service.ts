import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { SKIP_AUTH } from '../../auth/models/http-context-tokens';

export abstract class ApiService<T> {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  request!: (arg?: any) => Observable<T>;
  requestFormData?: (formData: FormData) => Observable<T>;

  constructor(
    private method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    private endpoint: string,
    private skipAuth?: boolean,
    private headers?: HttpHeaders
  ) {
    const context = this.skipAuth
      ? new HttpContext().set(SKIP_AUTH, true)
      : undefined;
    const finalHeaders = this.headers || undefined;

    if (this.method === 'GET' || this.method === 'DELETE') {
      this.request = (
        queryParams?: Record<string, string | number | boolean>
      ) => {
        let url = this.apiUrl + this.endpoint;

        if (queryParams && Object.keys(queryParams).length > 0) {
          const keys = Object.keys(queryParams);

          if (keys.length === 1) {
            const key = keys[0];
            url += `/${encodeURIComponent(queryParams[key])}`;
          } else {
            const queryString = Object.entries(queryParams)
              .map(
                ([key, value]) =>
                  `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
              )
              .join('&');
            url += `?${queryString}`;
          }
        }

        return this.method === 'GET'
          ? this.http.get<T>(url, { headers: finalHeaders, context })
          : this.http.delete<T>(url, { headers: finalHeaders, context });
      };
    } else if (this.method === 'POST' || this.method === 'PUT') {
      this.request = (payload?: any) => {
        return this.method === 'POST'
          ? this.http.post<T>(this.apiUrl + this.endpoint, payload, {
              headers: finalHeaders,
              context,
            })
          : this.http.put<T>(this.apiUrl + this.endpoint, payload, {
              headers: finalHeaders,
              context,
            });
      };

      this.requestFormData = (formData: FormData) => {
        return method === 'POST'
          ? this.http.post<T>(this.apiUrl + this.endpoint, formData, {
              headers: finalHeaders,
              context,
            })
          : this.http.put<T>(this.apiUrl + this.endpoint, formData, {
              headers: finalHeaders,
              context,
            });
      };
    } else {
      throw new Error(`Unsupported HTTP method: ${this.method}`);
    }
  }
}
