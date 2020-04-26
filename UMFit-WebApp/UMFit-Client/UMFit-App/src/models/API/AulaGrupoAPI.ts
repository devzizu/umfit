import IP_ADDR from "./API_DEFAULTS";

export {}

var baseURL: string = "http://" + IP_ADDR + ":5000/api/aulagrupo";

export function getPlanoSemanalAulas () {

    const res = fetch(baseURL + "/planosemanal", {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return res;
}