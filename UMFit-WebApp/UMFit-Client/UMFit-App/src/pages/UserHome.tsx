
import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from "@ionic/react";

const UserHome: React.FC = () => {

    return(
        <IonPage>
            <IonHeader>
              <IonToolbar color="primary">
                <IonButtons slot="start">
                  <IonMenuButton auto-hide="false"></IonMenuButton>
                </IonButtons>
                <IonTitle id="page-title">Olá?</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent class="background-image">
            </IonContent>
      </IonPage>
    );
}

export default UserHome;