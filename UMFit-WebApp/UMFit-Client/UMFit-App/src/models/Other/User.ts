
export {}

export class User {

    tipoDeUser: string;
    email: string;
    nif: number;
    nome: string;
    genero: number;
    data_nascimento: string;
    localidade: string;
    categoria: string;

    constructor(usertype: string,
                email: string, 
                nif: number, 
                nome: string,
                genero: number,
                data_nascimento: string,
                localidade: string,
                categoria: string) {
        
        this.tipoDeUser = usertype;
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
        tipoDeUser: user.tipoDeUser,
        email: user.email,
        nif: user.nif,
        nome: user.nome,
        genero: user.genero,
        data_nascimento: user.data_nascimento,
        localidade: user.localidade,
        categoria: user.categoria
    };
}

export function getTestValueUser(): User {

    return {
        tipoDeUser: "Cliente",
        email: "joseph.99.matt@umfit.com",
        nif: 123456789,
        nome: "Joseph Matt",
        genero: 0,
        data_nascimento: "22/02/1992",
        localidade: "Rua das flores, nº 554.",
        categoria: "Premium" 
    }
}