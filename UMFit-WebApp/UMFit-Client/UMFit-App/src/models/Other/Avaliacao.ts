
export {}

export class ComposicaoCorporal {

    peso: string
    altura: string
    imc: string
    idade_metabolica: number
    massa_magra: string
    massa_gorda: string

    constructor(peso: string,
                altura: string,
                imc: string,
                idade_metabolica: number,
                massa_magra: string,
                massa_gorda: string) {

        this.peso = peso;
        this.altura = altura;
        this.imc = imc;
        this.idade_metabolica = idade_metabolica;
        this.massa_magra = massa_magra;
        this.massa_gorda = massa_gorda;
    }
}

export class Perimetros {

    cintura: string
    abdomen: string
    ombro: string
    torax: string
    braco_dir: string
    braco_esq: string
    coxa_dir: string
    coxa_esq: string
    gemeo_dir: string
    gemeo_esq: string
    antebraco_dir: string
    antebraco_esq: string

    constructor(cintura: string,
                abdomen: string,
                ombro: string,
                torax: string,
                braco_dir: string,
                braco_esq: string,
                coxa_dir: string,
                coxa_esq: string,
                gemeo_dir: string,
                gemeo_esq: string,
                antebraco_dir: string,
                antebraco_esq: string) {

        this.cintura = cintura;
        this.abdomen = abdomen;
        this.ombro = ombro;
        this.torax = torax;
        this.braco_dir = braco_dir;
        this.braco_esq = braco_esq;
        this.coxa_dir = coxa_dir;
        this.coxa_esq = coxa_esq;
        this.gemeo_dir = gemeo_dir;
        this.gemeo_esq = gemeo_esq;
        this.antebraco_dir = antebraco_dir;
        this.antebraco_esq = antebraco_esq;
    }
}

export class Avaliacao {

    composicao_corporal: ComposicaoCorporal
    perimetros: Perimetros

    constructor(composicao_corporal: ComposicaoCorporal,
                perimetros: Perimetros) {

        this.composicao_corporal = composicao_corporal;
        this.perimetros = perimetros
    }
}