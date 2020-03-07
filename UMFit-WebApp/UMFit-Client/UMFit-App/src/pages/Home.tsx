
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/react';
import React from 'react';

//Page components
import LogIn from '../components/LogIn';
import './css/Home.css';


class Home extends React.Component {

  render() {

    return (
      <IonPage>
          <IonHeader>
              <IonToolbar color="primary">
                <IonButtons slot="start">
                  <IonMenuButton auto-hide="false"></IonMenuButton>
                </IonButtons>
                <IonTitle id="page-title">UMFit</IonTitle>
              </IonToolbar>
          </IonHeader>
      <IonContent class="background-image"></IonContent>
      <LogIn />
      </IonPage>
    );
  }

};

export default Home;

/*
<IonPage>
          <IonHeader>
              <IonToolbar color="primary">
                <IonButtons slot="start">
                  <IonMenuButton auto-hide="false"></IonMenuButton>
                </IonButtons>
                <IonTitle id="page-title">UMFit</IonTitle>
              </IonToolbar>
          </IonHeader>
      <IonContent class="background-image"></IonContent>
      <LogIn />
      </IonPage>
*/