
import { IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import React from "react";

const UserProfile: React.FC = () => {
    return(
      <IonPage>
            
            <IonHeader>
                <IonToolbar color="primary">
                  <IonTitle id="page-title">My profile</IonTitle>
                </IonToolbar>
            </IonHeader>
        

        </IonPage>
    );
}

/*
<IonContent class="background-image"></IonContent>
*/

export default UserProfile;

const Avaliacoes: React.FC = () => {
  return(
    <IonPage>
          
          <IonHeader>
              <IonToolbar color="primary">
                <IonTitle id="page-title">Avaliacoes</IonTitle>
              </IonToolbar>
          </IonHeader>
      

      </IonPage>
  );
}


export {Avaliacoes};
