import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonFooter, IonContent, IonCard, IonCardContent,IonCardTitle, IonCardHeader } from "@ionic/react";
import "./css/About.css"

const About: React.FC = () => {

    return(
      <IonPage>


        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">About</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>

          <IonCardHeader>
            <img src={require('../imgs/departamento_informatica.jpg')} width="100%" height="250" alt="Loading..."/> 
          </IonCardHeader>

          <IonCard className="card-about">

            <IonCardHeader>
              <IonCardTitle> <b>Sobre nós:</b> </IonCardTitle> 
            </IonCardHeader>
            
            <IonCardContent>
              Esta aplicação foi desenvolvida e concebida no ambiento da 
              unidade curricular de Laboratórios de Informática IV.
              <br></br>
              <br></br>
              A ideia desta aplicação surgiu da necessidade de implementar uma 
              aplicação para ginásios capaz de tornar mais interativa e ativa a 
              comunicação entre o cliente e o seu ginásio.
              <br></br>
              <br></br>
              Foi assim portanto implementadas funcionalidades como a vizualização 
              da evolução do cliente desde a sua entrada do ginásio, planos alimentares 
              para o mesmo e planos de treino propostos pelo instrutor.
              <br></br>
              <br></br>
              A estas funcionaliades poderão ser desenvolvidas muitas outras que a equipa de
              programadores pense que seja essencial à experiência do cliente.
              </IonCardContent>
          </IonCard>
        </IonContent>


        <IonFooter className="ion-no-border">
            <IonContent className="info-text"> © UMFit - 2020</IonContent>
        </IonFooter>

      </IonPage>
    );
}

export default About;