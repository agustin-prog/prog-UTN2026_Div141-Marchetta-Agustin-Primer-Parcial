import { Component, computed, effect, inject, input, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PeliculaStore } from '../pelicula.store';
import { PeliculaModel } from '../pelicula.models';

@Component({
  imports: [RouterLink],
  selector: 'app-pelicula-detail',
  styleUrl: './pelicula-detail.css',
  templateUrl: './pelicula-detail.html',
})
export class PeliculaDetail {

  peliculaId = input.required({transform:numberAttribute});

  private readonly store = inject(PeliculaStore);

  pelicula = computed<PeliculaModel | undefined>(() => {
    return this.store.find(this.peliculaId());
  });
}
