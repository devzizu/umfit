
export {}

export class User {

    email: string;
    nif: number;
    nome: string;
    genero: number;
    data_nascimento: string;
    localidade: string;
    categoria: string;

    constructor(email: string, 
                nif: number, 
                nome: string,
                genero: number,
                data_nascimento: string,
                localidade: string,
                categoria: string) {

        this.email = email;
        this.nif = nif;
        this.nome = nome;
        this.genero = genero;
        this.data_nascimento = data_nascimento;
        this.localidade = localidade;
        this.categoria = categoria;
    }
}

//Format the result from fetch Promise<any>
export function formatUser(user: any): User {
    
    return { 
        email: user.email,
        nif: user.nif,
        nome: user.nome,
        genero: user.genero,
        data_nascimento: user.data_nascimento,
        localidade: user.localidade,
        categoria: user.categoria
    };
}