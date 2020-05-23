import IP_ADDR from "./API_DEFAULTS";

export { };

var baseURL: string = "http://" + IP_ADDR + ":5000/api/aulagrupo";

export function getPlanoSemanalAulas (email:string) {
    const res = fetch(baseURL + "/planosemanalC", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            valueST: email
        })
    });

    return res;
}

export function getPlanoSemanal () {
    const res = fetch(baseURL + "/planosemanal", {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return res;
}

export function marcarAula (id : number) {

    const res = fetch(baseURL + "/marcarAula", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            token : localStorage.getItem("token"),
            aula : id
        })
    });

    return res;
}

export function desmarcarAula (id : number) {

    const res = fetch(baseURL + "/desmarcárAula", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            token : localStorage.getItem("token"),
            aula : id
        })
    });

    return res;
}

export function editarAula (aula : any) {

    const res = fetch(baseURL + "/editar", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            token : localStorage.getItem("token"),
            aula : aula
        })
    });

    return res;
}


export function alunosAula (id : string) {

    const res = fetch(baseURL + "/clientesAula", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            valueST : id
        })
    });

    return res;
}