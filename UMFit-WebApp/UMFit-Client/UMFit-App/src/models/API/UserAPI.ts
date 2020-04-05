
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

export function getUserStatus (token: string) {

    const res = fetch(baseURL + "/status", {
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

export function logout(token: string) {

    console.log("Sending logout call with email " + token);

    fetch(baseURL + "/logout", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueST: token
        })
    });
}

export function createUserAPI(newUserObj: any) {

    console.log("Sending call to create new User...");

    const res = fetch(baseURL + "/create", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserObj)
    });

    return res;
}

export async function getAllUsers () {

    const res = fetch(baseURL + "/emails", {
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

export function removeUser (email:string, type:string) {

    const res = fetch(baseURL + "/remove", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueST: localStorage.getItem("token"),
            email:email,
            type:type
        })
    });

    return res;
}

export function selectUser (email:string) {

    const res = fetch(baseURL + "/select", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueST: localStorage.getItem("token"),
            email:email
        })
    });

    return res;
}