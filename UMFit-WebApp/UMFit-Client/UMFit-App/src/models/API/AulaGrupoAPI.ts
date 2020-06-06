import IP_ADDR from "./API_DEFAULTS";

export { };

var baseURL: string = "https://" + IP_ADDR + "/api/aulagrupo";

export function getPlanoSemanalAulas (email:string) {
    const res = fetch(baseURL + "/planosemanal/cliente", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email: email,
            valueST : localStorage.getItem("token")
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

    const res = fetch(baseURL + "/marcar", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            valueST : localStorage.getItem("token"),
            aula : id
        })
    });

    return res;
}

export function desmarcarAula (id : number) {

    const res = fetch(baseURL + "/desmarcar", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            valueST : localStorage.getItem("token"),
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
            valueST : localStorage.getItem("token"),
            aula : aula
        })
    });

    return res;
}


export function alunosAula (id : string) {

    const res = fetch(baseURL + "/aula/clientes", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            valueST : localStorage.getItem("token"),
            aula : id
        })
    });

    return res;
}