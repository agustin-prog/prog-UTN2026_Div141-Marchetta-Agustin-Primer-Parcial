import { Injectable, signal } from "@angular/core";
import { SalaDraft, SalaModel } from "./sala.model";
import { generarButacas } from "../butacas/butaca-generador";


@Injectable({ providedIn: "root"})
export class SalaStore {
    
    readonly salas = signal<SalaModel[]>([
        {
            id: 1,
            nombreSala: "sala01",
            matrizButacas: generarButacas(),
        },
        {
            id: 2,
            nombreSala: "sala02",
            matrizButacas: generarButacas(),
        },
    ]);

    
    find(id: number): SalaModel | undefined {
        return this.salas().find((p) => Number(p.id) === Number(id));
    }

    add(draft: SalaDraft): SalaModel {
        const id = Math.max(0, ...this.salas().map((p) => p.id)) + 1;
        const pelicula: SalaModel = {id, ...draft};
        this.salas.update((list) => [...list, pelicula]);
        return pelicula;
    }

    update(id: number, patch: SalaModel): void {
        this.salas.update((list) => list.map((p) => (p.id === id ? {...p, ...patch} : p)));
    }

    remove(id: number): void {
        this.salas.update((list) => list.filter((p) => p.id !== id));
    }
}