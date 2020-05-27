import IP_ADDR from "./API_DEFAULTS";

export {}

var baseURL: string = "http://" + IP_ADDR + ":5000/api/planotreino";

export async function getListaExercicios () {

    const res = fetch(baseURL + "/exercicios", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueST: localStorage.getItem("token")
        })
    });
    

    return res;
}

export async function setPlanoTreino( pt:any ){

    const res = fetch(baseURL + "/add", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( pt)
    });
    

    return res;
}

export async function getPlanosTreino(mail_cliente: string){

    const res = fetch(baseURL + "/consultar", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueST: mail_cliente
        })
    });

    return res;
}