
export {}

var baseURL: string = "http://192.168.1.67:5000/api/aulagrupo";

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