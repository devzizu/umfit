
export {}

export class Exercicio {

    nome: string
    nm_repeticoes: string
    nm_series: string

    constructor(nm: string,
                rep: string,
                ser: string){
        
        this.nome = nm;
        this.nm_repeticoes = rep;
        this.nm_series = ser;
    }
}

export class PlanoTreino {

    nome: string
    tipo: string
    grupos_musculares: string
    frequencia: string
    lista_exercicios: Array<Exercicio>

    constructor(nm: string, 
                tip: string,
                grp: string,
                freq: string,
                list: Array<Exercicio>) {
        
        this.nome = nm;
        this.tipo = tip;
        this.grupos_musculares = grp;
        this.frequencia = freq;
        this.lista_exercicios = JSON.parse(JSON.stringify(list))
    }
}