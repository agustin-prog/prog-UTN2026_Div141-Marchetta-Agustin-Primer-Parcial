import { inject, Injectable, signal } from "@angular/core";
import { PeliculaDraft, PeliculaModel } from "./pelicula.models";
import { GeneroStore } from "../generos/genero.store";
import { GeneroModel } from "../generos/genero.model";

@Injectable({ providedIn: "root"})
export class PeliculaStore {

    private readonly generoStore = inject(GeneroStore);

    /* Asignamos unos valores de prueba simulando que son las peliculas que estan en base de datos */
    readonly peliculas = signal<PeliculaModel[]>([
        {
        id: 1,
        nombre: "Dune: Part Two",
        sinopsis: "Paul Atreides se une a los Fremen mientras busca vengarse de quienes destruyeron a su familia, enfrentándose a decisiones que pueden cambiar el destino del universo.",
        imagenURL: "https://placehold.co/300x450?text=Dune%3A+Part+Two",
        duracionMinutos: 166,
        generos: this.mapearGeneros([3, 2, 4]),
        restriccionEdad: "+13"
    },
    {
        id: 2,
        nombre: "The Substance",
        sinopsis: "Una celebridad en decadencia utiliza una misteriosa sustancia que le permite crear una versión más joven de sí misma, con consecuencias inesperadas.",
        imagenURL: "https://placehold.co/300x450?text=The+Substance",
        duracionMinutos: 141,
        generos: this.mapearGeneros([1, 3, 4]),
        restriccionEdad: "+18"
    },
    {
        id: 3,
        nombre: "Superman",
        sinopsis: "Clark Kent intenta equilibrar su herencia kryptoniana con su vida humana mientras defiende a la humanidad como Superman.",
        imagenURL: "https://placehold.co/300x450?text=Superman",
        duracionMinutos: 129,
        generos: this.mapearGeneros([5, 2, 3]),
        restriccionEdad: "+13"
    },
    {
        id: 4,
        nombre: "F1: The Movie",
        sinopsis: "Un antiguo piloto de Fórmula 1 regresa a las pistas para ayudar a un joven piloto y enfrentarse nuevamente a los desafíos de las carreras profesionales.",
        imagenURL: "https://placehold.co/300x450?text=F1%3A+The+Movie",
        duracionMinutos: 155,
        generos: this.mapearGeneros([5, 4, 6]),
        restriccionEdad: "+13"
    },
    {
        id: 5,
        nombre: "Jurassic World: Rebirth",
        sinopsis: "Un equipo de exploradores se aventura en una peligrosa región para investigar dinosaurios y recuperar material genético con un enorme valor científico.",
        imagenURL: "https://placehold.co/300x450?text=Jurassic+World%3A+Rebirth",
        duracionMinutos: 133,
        generos: this.mapearGeneros([5, 2, 3]),
        restriccionEdad: "+13"
    },
    {
        id: 6,
        nombre: "Mission: Impossible - The Final Reckoning",
        sinopsis: "Ethan Hunt y su equipo se enfrentan a una nueva amenaza mientras intentan evitar que una poderosa inteligencia artificial caiga en las manos equivocadas.",
        imagenURL: "https://placehold.co/300x450?text=Mission%3A+Impossible",
        duracionMinutos: 169,
        generos: this.mapearGeneros([5, 2, 7]),
        restriccionEdad: "+13"
    }
    ]);

    // 3. Función auxiliar para transformar IDs en objetos GeneroModel enteros
    private mapearGeneros(ids: number[]): GeneroModel[] {
        return ids
            .map(id => this.generoStore.find(id))
            .filter((g): g is GeneroModel => !!g); // Filtra los undefined por si un ID no existe
    }

    /* Aca irian los metodos o funciones que comunican con supabase y traen la informacion */

    find(id: number): PeliculaModel | undefined {
        return this.peliculas().find((p) => Number(p.id) === Number(id));
    }

    add(draft: PeliculaDraft): PeliculaModel {
        const id = Math.max(0, ...this.peliculas().map((p) => p.id)) + 1;
        const pelicula: PeliculaModel = {id, ...draft};
        this.peliculas.update((list) => [...list, pelicula]);
        return pelicula;
    }

    update(id: number, patch: PeliculaModel): void {
        this.peliculas.update((list) => list.map((p) => (p.id === id ? {...p, ...patch} : p)));
    }

    remove(id: number): void {
        this.peliculas.update((list) => list.filter((p) => p.id !== id));
    }
};