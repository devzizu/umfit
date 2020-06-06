import IP_ADDR from "./API_DEFAULTS";

export {}

var baseURL: string = "https://" + IP_ADDR + "/api/planoalimentar";

export async function getListaRefeicoes () {

    const res = fetch(baseURL + "/refeicoes", {
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

export async function setPlanoAlimentar( pt:any ){

    const res = fetch(baseURL , {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pt)
    });
    

    return res;
}

export async function getPlanosAlimentares(mail_cliente: string){

    const res = fetch(baseURL + "/consultar", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: mail_cliente,
            valueST: localStorage.getItem("token")
        })
    });

    return res;
}