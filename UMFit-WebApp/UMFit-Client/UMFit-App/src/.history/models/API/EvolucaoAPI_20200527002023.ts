import IP_ADDR from "./API_DEFAULTS";
import { AvaliacaoAgendada } from "../../pages/user/AgendarAvaliacao";

export {}

var baseURL: string = "http://" + IP_ADDR + ":5000/api/avaliacao";

export function getEvolucao () {

    const res = fetch(baseURL + "/evolucao", {
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

export function getLastAvaliacao(email : string){
    var res = fetch(baseURL + "/ultima", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueST: localStorage.getItem("token"),
            email : email
        })
    });

    return res;
}

export function criarAvaliacao(dt:any, email_c: any, email_i: any, pt: any){

    var enviar = {

        data: dt,
        email_cliente: email_c,
        email_instrutor: email_i,
        plano_treino: pt
    }

    var res = fetch(baseURL + "/criar", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enviar)
    });

    return res;
}


export function getAvaliacoesAgendadas(email : string){
    var res = fetch(baseURL + "/agendadas", {
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

export function setAvaliacao(email : string, aval : AvaliacaoAgendada){
    var enviar = {
        avaliacao : aval,
        email : email
    }

    var res = fetch(baseURL + "/agendar", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enviar)
    });

    return res;
}
export function getAvaliacoesAgendadasInstrutor(email : string){
    var res = fetch(baseURL + "/agendadasI", {
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
