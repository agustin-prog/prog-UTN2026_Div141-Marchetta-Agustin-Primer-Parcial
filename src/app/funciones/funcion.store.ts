import { inject, Injectable, signal } from "@angular/core";
import { PeliculaStore } from "../peliculas/pelicula.store";
import { FuncionDraft, FuncionModel } from "./funcion.model";
import { SalaStore } from "../salas/sala.store";

@Injectable({ providedIn: "root"})
export class FuncionStore {

    private readonly peliculaStore = inject(PeliculaStore);

    private readonly salaStore = inject(SalaStore);

    readonly funciones = signal<FuncionModel[]>([
        {
            id: 1,
            // AGREGANDO EL ! : Le asegurás que el objeto existe
            pelicula: this.peliculaStore.find(1)!, 
            formato: "2D",
            idioma: "castellano",
            fechaHoraInicio: new Date(2026, 9, 27, 13, 0),
            sala: this.salaStore.find(1)!,
            precio: 20000,
            esPreventa: false,
        },
        {
            id: 2,
            // AGREGANDO EL ! : Le asegurás que el objeto existe
            pelicula: this.peliculaStore.find(1)!, 
            formato: "2D",
            idioma: "castellano",
            fechaHoraInicio: new Date(2026, 9, 27, 14, 30),
            sala: this.salaStore.find(1)!,
            precio: 20000,
            esPreventa: false,
        },
        {
            id: 3,
            // AGREGANDO EL ! : Le asegurás que el objeto existe
            pelicula: this.peliculaStore.find(1)!, 
            formato: "3D",
            idioma: "castellano",
            fechaHoraInicio: new Date(2026, 9, 28, 16, 0),
            sala: this.salaStore.find(1)!,
            precio: 30000,
            esPreventa: false,
        },
        {
            id: 4,
            // AGREGANDO EL ! : Le asegurás que el objeto existe
            pelicula: this.peliculaStore.find(1)!, 
            formato: "4D",
            idioma: "subtitulada",
            fechaHoraInicio: new Date(2026, 9, 29, 17, 30),
            sala: this.salaStore.find(1)!,
            precio: 80000,
            esPreventa: false,
        },
        {
            id: 5,
            // AGREGANDO EL ! : Le asegurás que el objeto existe
            pelicula: this.peliculaStore.find(2)!, 
            formato: "5D",
            idioma: "castellano",
            fechaHoraInicio: new Date(2026, 9, 27, 13, 0), 
            sala: this.salaStore.find(2)!,
            precio: 100000,
            esPreventa: false,
        },
        {
            id: 6,
            // AGREGANDO EL ! : Le asegurás que el objeto existe
            pelicula: this.peliculaStore.find(2)!, 
            formato: "2D",
            idioma: "castellano",
            fechaHoraInicio: new Date(2026, 9, 27, 14, 30),
            sala: this.salaStore.find(2)!,
            precio: 20000,
            esPreventa: false,
        }
    ]);

    buscarPorPelicula(peliculaID: number): FuncionModel[] | undefined {

        return this.funciones().filter((f) => f.pelicula.id === peliculaID);
    }

    find(id: number): FuncionModel | undefined {
        return this.funciones().find((f) => Number(f.id) === Number(id));
    }

    add(draft: FuncionDraft): FuncionModel {
        const id = Math.max(0, ...this.funciones().map((f) => f.id)) + 1;
        const pelicula: FuncionModel = {id, ...draft};
        this.funciones.update((list) => [...list, pelicula]);
        return pelicula;
    }

    update(id: number, patch: FuncionModel): void {
        this.funciones.update((list) => list.map((f) => (f.id === id ? {...f, ...patch} : f)));
    }

    remove(id: number): void {
        this.funciones.update((list) => list.filter((f) => f.id !== id));
    }
};