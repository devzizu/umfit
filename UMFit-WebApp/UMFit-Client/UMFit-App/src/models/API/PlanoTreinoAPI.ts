export {}

var baseURL: string = "http://192.168.1.77:5000/api/planotreino";

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