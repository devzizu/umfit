
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
    data_inicio : string
    data_fim : string
    lista_exercicios: Array<Exercicio>
    

    constructor(nm: string, 
                tip: string,
                grp: string,
                freq: string,
                init :string,
                end : string,
                list: Array<Exercicio>) {
        
        this.nome = nm;
        this.tipo = tip;
        this.grupos_musculares = grp;
        this.frequencia = freq;
        this.data_inicio = init;
        this.data_fim = end;
        this.lista_exercicios = JSON.parse(JSON.stringify(list))
    }
}