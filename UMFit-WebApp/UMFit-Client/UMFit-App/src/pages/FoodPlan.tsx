import React, { useState } from 'react';
import { IonInput, IonItem, IonLabel, IonList, IonCheckbox, IonItemDivider, IonButton,IonCardContent, IonModal,IonCard,IonCardSubtitle,IonCardHeader,IonCardTitle, IonText } from '@ionic/react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonFooter, IonContent } from "@ionic/react";
import "./css/About.css"

const checkboxList = [
  { val: 'Pequeno-Almoço', isChecked: false },
  { val: 'Meio da manhã', isChecked: false },
  { val: 'Almoço', isChecked: false },
  { val: 'Lanche 1', isChecked: false },
  { val: 'Lanche 2', isChecked: false },
  { val: 'Jantar', isChecked: false }
];


const About: React.FC = () => {

    const [text, setText] = useState<string>();
    const [showModal, setShowModal] = useState(false);

    return(
      <IonPage>


        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">Criar Plano Alimentar</IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonContent>
          <div className="info-wrapper">
            <IonList>
              <IonItem>
                <IonInput value={text} placeholder="E-mail" onIonChange={e => setText(e.detail.value!)}></IonInput>
              </IonItem>
            </IonList>
          </div>  
        
          <div className="info-wrapper">
            <IonList>
              <IonItem>
                <IonText>Nome: Jose</IonText>
              </IonItem>
              <IonItem>
                <IonText>Email: jose@gmail.com</IonText>
              </IonItem>
            </IonList>
          </div>
          <div className="info-wrapper">
            <IonList>
              <IonItem>
                <IonLabel>Nome: </IonLabel>
                <IonInput value={text}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Frequência: </IonLabel>
                <IonInput value={text}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Refeições Livres: </IonLabel>
                <IonInput value={text}></IonInput>
              </IonItem>
            </IonList>
          </div>
        <IonList>
          <IonItemDivider>Refeições</IonItemDivider>

          {checkboxList.map(({ val, isChecked }, i) => (
            <IonItem key={i}>
              <IonLabel>{val}</IonLabel>
              <IonCheckbox slot="end" value={val} checked={isChecked} />
            </IonItem>
          ))}
        </IonList>
        <IonModal isOpen={showModal}>
          <IonList>
            <IonItem>
              <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Pequeno-Almoço</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <p>1x Pão com fiambre ou queijo;</p>
                  <p>1x Café;</p>
                  <p>1x Copo de leite;</p>
                </IonCardContent>
              </IonCard>
            </IonItem>
            <IonItem>
              <IonCard>
                  <IonCardHeader>
                      <IonCardTitle>Almoço</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    <p>1x Bife;</p>
                    <p>1x Arroz;</p>
                    <p>1x Água;</p>
                  </IonCardContent>
                </IonCard>
            </IonItem>
          </IonList>
          <IonButton onClick={() => setShowModal(false)}>Fechar Receitas</IonButton>
        </IonModal>
        <div className="info-wrapper">
          <IonButton onClick={() => setShowModal(true)}>Ver Receitas</IonButton>
        </div>
        <div className="info-wrapper">
          <IonButton> Criar Plano Alimentar</IonButton>
        </div>
        </IonContent>

        <IonFooter className="ion-no-border">
            <IonContent className="info-text"> © UMFit - 2020</IonContent>
        </IonFooter>
      </IonPage>
      
    );
    
}

export default About;