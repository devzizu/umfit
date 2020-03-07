
import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from "@ionic/react";

const About: React.FC = () => {

    return(
        <IonPage>
            <IonHeader>
              <IonToolbar color="primary">
                <IonButtons slot="start">
                  <IonMenuButton auto-hide="false"></IonMenuButton>
                </IonButtons>
                <IonTitle id="page-title">Quem somos?</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent class="background-image">
            </IonContent>
      </IonPage>
    );
}

export default About;