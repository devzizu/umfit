
export {}

var baseURL: string = "http://192.168.1.67:5000/api/user";

//Returns the user object in case login OK
export async function authenticate (email: string, pass: string) {

    const res = await fetch(baseURL + "/authenticate", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: pass 
        })
    });

    return res;
}

export function getUserStatus (email: string) {

    const res = fetch(baseURL + "/status", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: ""
        })
    });

    return res;
}
