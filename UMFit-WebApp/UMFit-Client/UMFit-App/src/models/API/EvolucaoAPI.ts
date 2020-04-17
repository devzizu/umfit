
export {}

var baseURL: string = "http://192.168.1.77:5000/api/avaliacao";

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