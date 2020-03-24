
import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonFooter, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonIcon} from "@ionic/react";
import "./css/Contact.css"

import { mailOutline, call} from "ionicons/icons";

const Contact: React.FC = () => {

    return(
      <IonPage>


        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">Contact</IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonContent>

          <IonCardHeader>
            <img src={require('../imgs/departamento_informatica.jpg')} width="100%" height="250" alt="Loading..."/>
          </IonCardHeader>

          <IonCard className="card-contact">

            <IonCardHeader>
              <IonCardTitle><b>Contacta-nos:</b></IonCardTitle> 
            </IonCardHeader>

            <IonCardContent>
            Para entrar em contacto connosco sobre alguma dúvida ou questão sobre a aplicação
            utilize os seguintes contactos para o fim proposto. Ou mesmo se encontrar qualquer
            tipo de falha na nossa aplicação não nos hesite em contactar.
            <br></br>
            <br></br>
            <IonIcon slot="start" icon={mailOutline} />   umfit@gmail.com
            <br></br>
            <br></br>
            <IonIcon slot="start" icon={call} />   +351 933 564 873
            <br></br>
            <br></br>
            Obrigado a equipa de suporte UMFIT.
            </IonCardContent>
          </IonCard>
        </IonContent>

        <IonFooter className="ion-no-border">
            <IonContent className="info-text"> © UMFit - 2020</IonContent>
        </IonFooter>

      </IonPage>
    );
}

export default Contact;