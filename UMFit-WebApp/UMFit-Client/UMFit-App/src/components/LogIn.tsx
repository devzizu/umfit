
import React, { useState } from 'react';

import './css/LogIn.css';
import { IonInput, IonText, IonButton, IonLoading } from '@ionic/react';

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
                console.log("E-Mail: " + emailValue);
                console.log("Password: " + passwordValue);
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
