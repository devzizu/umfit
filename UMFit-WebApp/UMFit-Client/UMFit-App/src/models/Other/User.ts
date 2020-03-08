
export {}

export class User {

    id: number;
    email: string;
    password: string;

    constructor(id: string, em: string, pass: string) {

        this.id = -1;
        this.email = "";
        this.password = "";
    }
}

//Format the result from fetch Promise<any>
export function formatUser(user: any): User {
    
    return { 
        id: user.id, 
        email: user.email,
        password: user.password
    };
}


/*
interface User {
    id: number,
    email: string,
    password: string
}

function formatUser(user: any): User {
    
    return { 
        id: user.id, 
        email: user.email,
        password: user.password 
    };
  }
*/