
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { call, mailOutline } from "ionicons/icons";
import React from "react";
import "./css/Contact.css";


const Contact: React.FC = () => {

    return(
      <IonPage>


        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">UMFit | Contacto</IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonContent>

          <IonCardHeader>
            <img className="cardImage" src={require('../imgs/departamento_informatica.jpg')} width="100%" height="250" alt="Loading..."/>
          </IonCardHeader>

          <IonCard className="card-contact">

            <IonCardHeader>
              <IonCardTitle><b>Entra em contacto connosco:</b></IonCardTitle> 
            </IonCardHeader>

            <IonCardContent className="about-text">
            Para entrar em contacto connosco sobre alguma dúvida ou questão sobre a aplicação
            utilize os seguintes contactos para o fim proposto. Ou mesmo se encontrar qualquer
            tipo de falha na nossa aplicação não nos hesite em contactar.
            <br></br>
            <br></br>
            <IonIcon slot="start" icon={mailOutline} />   <b>support.customers@umfit.com</b>
            <br></br>
            <br></br>
            <IonIcon slot="start" icon={call} />   +351 912 345 678
            <br></br>
            <br></br>
            Obrigado, a equipa de suporte da UMFit.
            </IonCardContent>
          </IonCard>
        </IonContent>

        

      </IonPage>
    );
}

export default Contact;