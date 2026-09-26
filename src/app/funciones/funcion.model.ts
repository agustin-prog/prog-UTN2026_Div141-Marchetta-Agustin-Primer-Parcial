import { PeliculaModel } from "../peliculas/pelicula.models";
import { SalaModel } from "../salas/sala.model";

export type Formato = '2D' | '3D' | '4D' | '5D';
export type Idioma = 'castellano' | 'subtitulada';

export interface FuncionModel {
    id: number;
    pelicula: PeliculaModel;
    formato: Formato;
    idioma: Idioma;
    fechaHoraInicio: Date;
    sala: SalaModel;
    precio: number;
    esPreventa: boolean;
    precioPreventa?: number;
}

export type FuncionDraft = Omit<FuncionModel, "id">;

export type FuncionPatch = Partial<FuncionModel>;