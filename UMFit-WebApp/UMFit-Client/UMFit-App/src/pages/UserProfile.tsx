
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from "@ionic/react";
import React from "react";

const UserProfile: React.FC = () => {
    return(
      <IonPage>
            
            <IonHeader>
                <IonToolbar color="primary">
                  <IonButtons slot="start">
                    <IonMenuButton auto-hide="false"></IonMenuButton>
                  </IonButtons>
                  <IonTitle id="page-title">UMFit</IonTitle>
                </IonToolbar>
            </IonHeader>
        
        </IonPage>
    );
}

export default UserProfile;

/*
<IonContent class="background-image"></IonContent>
*/