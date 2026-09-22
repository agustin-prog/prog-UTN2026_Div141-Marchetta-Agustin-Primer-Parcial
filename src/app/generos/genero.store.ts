import { Injectable, signal } from "@angular/core";
import { GeneroDraft, GeneroModel } from "./genero.model";


@Injectable({ providedIn: "root"})
export class GeneroStore {

    readonly generos = signal<GeneroModel[]>([
        {
            id: 1,
            nombre: "Terror",
        },
        {
            id: 2,
            nombre: "Aventura",
        },
        {
            id: 3,
            nombre: "Ciencia ficción",
        },
        {
            id: 4,
            nombre: "Drama",
        },
        {
            id: 5,
            nombre: "Acción",
        },
        {
            id: 6,
            nombre: "Deportes",
        },
        {
            id: 7,
            nombre: "thriller",
        },
    ]);


    find(id: number): GeneroModel | undefined {
        return this.generos().find((p) => Number(p.id) === Number(id));
    }

    add(draft: GeneroDraft): GeneroModel {
        const id = Math.max(0, ...this.generos().map((p) => p.id)) + 1;
        const genero: GeneroModel = {id, ...draft};
        this.generos.update((list) => [...list, genero]);
        return genero;
    }

    update(id: number, patch: GeneroModel): void {
        this.generos.update((list) => list.map((p) => (p.id === id ? {...p, ...patch} : p)));
    }

    remove(id: number): void {
        this.generos.update((list) => list.filter((p) => p.id !== id));
    }
}