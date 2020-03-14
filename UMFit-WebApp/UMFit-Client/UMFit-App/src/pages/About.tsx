
import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

const About: React.FC = () => {

    return(
      <IonPage>


        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">About</IonTitle>
          </IonToolbar>
        </IonHeader>


      </IonPage>
    );
}

export default About;