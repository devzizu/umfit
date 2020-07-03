import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from "@ionic/react";
import React from "react";
import "./css/About.css";

const About: React.FC = () => {

    return(
      <IonPage>


        
        
        <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle id="page-title">Sobre</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>

          <IonCardHeader>
            <img className="cardImage" src={require('../imgs/departamento_informatica.jpg')} alt="Loading..."/> 
          </IonCardHeader>

          <IonCard className="card-about">

            <IonCardHeader>
              <IonCardTitle> <b>Sobre nós:</b> </IonCardTitle> 
            </IonCardHeader>
            
            <IonCardContent className="about-text">
              Esta aplicação foi desenvolvida âmbito da 
              unidade curricular de Laboratórios de Informática IV.
              <br></br>
              <br></br>
              A ideia desta aplicação surgiu na necessidade de implementar uma 
              aplicação para ginásios capaz de tornar mais interativa e prática a 
              comunicação entre um cliente e o seu ginásio.
              <br></br>
              <br></br>
              Foram assim portanto implementadas funcionalidades como a vizualização 
              da evolução do cliente desde a sua entrada do ginásio, planos alimentares 
              para o mesmo e planos de treino propostos pelo instrutor e registos das suas
              avaliações.
              <br></br>
              <br></br>
              A estas funcionaliades poderão ser desenvolvidas muitas outras que a equipa de
              programadores pense que seja essencial à experiência do cliente.
              </IonCardContent>
          </IonCard>
        </IonContent>


        
      </IonPage>
    );
}

export default About;