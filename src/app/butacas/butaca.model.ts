export type TipoButaca = 'normal' | 'accesible' | 'VIP';

export interface ButacaModel {
    id: string;
    letraFila: string;
    numero: number;
    fila: number;
    columna: number;
    tipo: TipoButaca;
}

export type ButacaDraft = Omit<ButacaModel, "id">;

export type ButacaPatch = Partial<ButacaModel>;
