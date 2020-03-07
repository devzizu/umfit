
import React, { useState } from 'react';

import sha256 from "fast-sha256";
//import axios from 'axios';

import './css/LogIn.css';
import { IonInput, IonText, IonButton, IonLoading } from '@ionic/react';

var baseURL: string = "https://192.168.1.67:5001/api/user";

interface User {
    id: number,
    email: string,
    password: string
}

const authenticate = async (email: string, pass: string) => {

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

    return await res.json();
}

const LogIn: React.FC = () => {

    const [showLoading, setShowLoading] = useState(false);
    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");

    /* Future use
    const [data, setData] = useState({
        email: "not_fetched",
        password: "not_fetched"
    });
    */

    setTimeout(() => {
        setShowLoading(false);
    }, 2000);
    
    /* Future use
    useEffect(() => {
        const res = authenticate(emailValue, passwordValue);
    }, []);
    */

    return (
        <div id="login-form">
            <div id="Logo"></div>
            <div id="phrase">
                <IonText>O teu ginásio da UMinho...</IonText>
            </div>
        <div id="input-form">
            <br></br>
            <IonInput required type="email" id="email-input" placeholder="E-Mail"
            value={emailValue}
            onIonChange={(e) => {
                setEmailValue((e.target as HTMLInputElement).value);
            }}>
            </IonInput>
            <br></br>
            <IonInput required type="password" id="pass-input" placeholder="Password"
            value={passwordValue}
            onIonChange={(e) => {
                setPasswordValue((e.target as HTMLInputElement).value);
            }}>
            </IonInput>
        </div>
        <IonButton expand="block" type="submit" id="login-button" onClick={() => {
                
                setShowLoading(true);

                let pass_enc = new TextEncoder();
                let encoded = pass_enc.encode(passwordValue);
                let hash256 = Buffer.from(sha256(encoded)).toString('hex').toUpperCase();

                console.log("Http post to api/user/authenticate:");
                console.log("> E-Mail: " + emailValue);
                console.log("> Password: " + passwordValue);
                console.log("> Password (sha256): " + hash256);

                //request
                let json_res = authenticate(emailValue, passwordValue);

                json_res.then(function(value) {
                    
                    console.log(value);
                });
            }
        }>
            Log-In

        </IonButton>
            <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Espere um momento...'}
                duration={5000}
            />
        </div>

        
    );
};

export default LogIn;
