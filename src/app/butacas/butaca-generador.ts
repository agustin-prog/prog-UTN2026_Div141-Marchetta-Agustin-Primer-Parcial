import { ButacaModel, TipoButaca } from "./butaca.model";

export function generarButacas(): ButacaModel[][][] {

    const mapaTemporal: ButacaModel[][][] = [];
    const letrasFilas = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T"];

    for (let f = 0; f < letrasFilas.length; f++){

        let tipoButaca : TipoButaca
        const letraFila = letrasFilas[f];

        let cantSector1 = 4;
        let cantSector2 = 20;
        let cantSector3 = 4;
        tipoButaca = "normal"

        if (letraFila === "J" || letraFila === "K") {
            cantSector1 = 2;
            cantSector2 = 10;
            cantSector3 = 2;
            tipoButaca = "accesible"
        }

        if (letraFila === "R" || letraFila === "S" || letraFila === "T"){
            tipoButaca = "VIP"
        }

        const distribucionSectores = [cantSector1, cantSector2, cantSector3];
        const filaActual: ButacaModel[][] = [];

        for (let s = 0; s < distribucionSectores.length; s++) {

            const cantidadButacas = distribucionSectores[s];
            const sectorActual: ButacaModel[] = [];

            for (let b = 1; b <= cantidadButacas; b++) {

                const idButaca = `${letraFila}-S${s + 1}-${b}`;

                sectorActual.push({
                    id: idButaca,
                    letraFila: letraFila,
                    numero: b,
                    fila: f,
                    columna: b,
                    tipo: tipoButaca,
                });
            }

            filaActual.push(sectorActual);
        }

        mapaTemporal.push(filaActual);
    }

    return mapaTemporal;
}