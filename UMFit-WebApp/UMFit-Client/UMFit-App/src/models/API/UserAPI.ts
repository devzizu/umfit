
export {}

var baseURL: string = "https://192.168.1.67:5001/api/user";

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

    /* Future use
    const [data, setData] = useState({
        email: "not_fetched",
        password: "not_fetched"
    });
    */

        /* Future use
    useEffect(() => {
        const res = authenticate(emailValue, passwordValue);
    }, []);
    */