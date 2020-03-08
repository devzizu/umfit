
import React, { useState } from 'react';

import sha256 from "fast-sha256";

import './css/LogIn.css';
import { IonInput, IonText, IonButton, IonLoading } from '@ionic/react';
import { authenticate } from '../models/API/UserAPI';
import { formatUser, User } from '../models/Other/User';
import ReactDOM from 'react-dom';
import AppProfile from './sections/AppProfile';

const LogIn: React.FC = () => {

    const [showLoading, setShowLoading] = useState(false);
    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");

    setTimeout(() => {
        setShowLoading(false);
    }, 2000);

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

                console.log("Para a API: /api/user/authenticate");
                console.log("> E-Mail: " + emailValue);
                console.log("> Password: " + passwordValue);
                console.log("> Password (sha256): " + hash256);

                //request
                let response = authenticate(emailValue, passwordValue);

                response.then(function(value) {
                    
                    //Success OK = 200    
                    if (value.status === 200) {
                        
                        console.log("Resposta LOGIN OK");
             
                        var json = value.json();

                        json.then(function(value) {
                            
                            let user: User = formatUser(value);
                            
                            console.log(user);

                            //ReactDOM.render(<AppProfile />, document.getElementById('root'));

                            //<MenuClienteStandard>
                        });

                    //Login error: 400    
                    } else {

                        console.log(value.status + " Resposta LOGIN not OK");
                    }
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
