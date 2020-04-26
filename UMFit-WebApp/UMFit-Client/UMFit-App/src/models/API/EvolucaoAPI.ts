import IP_ADDR from "./API_DEFAULTS";

export {}

var baseURL: string = "http://" + IP_ADDR + ":5000/api/avaliacao";

export function getEvolucao (token: string) {

    const res = fetch(baseURL + "/evolucao", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueST: token
        })
    });

    return res;
}

export function getLastAvaliacao(email : string){
    var res = fetch(baseURL + "/last", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueST: email
        })
    });

    return res;
}