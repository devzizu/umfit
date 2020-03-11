
import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from "@ionic/react";

const About: React.FC = () => {

    return(
        <IonPage id="main">
            <IonHeader>
              <IonToolbar color="primary">
                <IonButtons slot="start">
                  <IonMenuButton auto-hide="false"></IonMenuButton>
                </IonButtons>
                <IonTitle id="page-title">Quem somos?</IonTitle>
              </IonToolbar>
            </IonHeader>

      </IonPage>
    );
}

export default About;