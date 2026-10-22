import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NasaApod } from '../modelli/nasa-apod';
import { NasaService } from '../services/nasa-service';

@Component({
  selector: 'app-nasa',
  imports: [],
  templateUrl: './nasa.html',
  styleUrl: './nasa.css',
})
export class Nasa implements OnInit {
  private readonly nasaService = inject(NasaService);

  readonly apod = signal<NasaApod | null>(null);
  readonly loading = signal(false);
  readonly errore = signal<string | null>(null);

  ngOnInit(): void {
    this.caricaApod();
  }

  caricaApod(): void {
    this.loading.set(true);
    this.errore.set(null);
    this.nasaService.getApod().subscribe({
      next: (dato: NasaApod) => {
        this.apod.set(dato);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.errore.set(`Errore ${err.status}: ${err.message}`);
        this.loading.set(false);
      },
    });
  }
}
