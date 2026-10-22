import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NasaApod } from '../modelli/nasa-apod';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  private readonly http = inject(HttpClient);
  private readonly apiKey = 'DEMO_KEY';
  private readonly apiUrl = 'https://api.nasa.gov/planetary/apod';

  getApod(): Observable<NasaApod> {
    return this.http.get<NasaApod>(`${this.apiUrl}?api_key=${this.apiKey}`);
  }
}
