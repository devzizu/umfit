
import React from "react";

import "../css/InserirUtilizador.css"
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonIcon, IonSelect, IonSelectOption, IonDatetime } from "@ionic/react";
import { personOutline, mailOutline, cardOutline, locationOutline } from "ionicons/icons";

//---------------------------------------------------------------------------------------------------------------------------------

class InserirUtilizador extends React.Component<any> {

    state: {
        nome_completo: string
    }

    constructor(props: any) {

        super(props);

        this.state = {
            nome_completo: ""
        }
    }

    render() {
        return(
            
            <IonPage>

                <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle id="page-title">Inserir um novo Utilizador</IonTitle>
                </IonToolbar>
                </IonHeader>
    
                <IonContent className="PageContent">

                    <IonGrid className="PageGrid">

                        <IonRow>
                            <IonCol size="2.5" className="Row1ProfilePic">
                                
                                <img src={require('../../imgs/perfil_pic.png')} width="150" height="150" alt="Loading..."/> 
                            
                            </IonCol>

                            <IonCol>

                                <IonGrid>

                                    <IonRow>

                                        <IonCol className="FirstForm">

                                            <IonItem>
                                                <IonIcon slot="start" icon={personOutline}></IonIcon>
                                                <IonLabel position="floating">Nome Completo</IonLabel>
                                                <IonInput required value={""}></IonInput>
                                            </IonItem>                                           

                                            <IonItem>
                                                <IonIcon slot="start" icon={mailOutline}></IonIcon>
                                                <IonLabel position="floating">E-Mail</IonLabel>
                                                <IonInput required value={""}></IonInput>
                                            </IonItem>                                           

                                            <IonItem>
                                                <IonIcon slot="start" icon={locationOutline}></IonIcon>
                                                <IonLabel position="floating">Localidade:</IonLabel>
                                                <IonInput required value={""}></IonInput>
                                            </IonItem>                                           

                                            <IonItem>
                                                <IonIcon slot="start" icon={cardOutline}></IonIcon>
                                                <IonLabel position="floating">Nif:</IonLabel>
                                                <IonInput required value={""}></IonInput>
                                            </IonItem>                                           

                                        </IonCol>

                                    </IonRow>

                                    <IonRow>

                                        <IonCol>

                                            <IonItem className="SelectUser">
                                                <IonLabel>Tipo de sócio: </IonLabel>
                                                <IonSelect value="notifications">
                                                    <IonSelectOption value="01"><b>Cliente</b> Standard</IonSelectOption>
                                                    <IonSelectOption value="02"><b>Cliente</b> Premium</IonSelectOption>
                                                    <IonSelectOption value="03"><b>Cliente</b> Instrutor</IonSelectOption>
                                                </IonSelect>
                                            </IonItem>

                                        </IonCol>

                                    </IonRow>

                                    <IonRow>

                                        <IonCol>
                                            
                                            <IonItem className="SelectDate">

                                                <IonLabel>Data de Nasc.:</IonLabel>
                                                <IonDatetime value="1999-02-20"></IonDatetime>

                                            </IonItem>

                                        </IonCol>

                                    </IonRow>

                                </IonGrid>

                            </IonCol>
                        </IonRow>

                    </IonGrid>

                </IonContent>
    
            </IonPage>    
        );
    }
}

export default InserirUtilizador;

    /*
        (nome + , email + , nif + , data_nasc, genero, categoria, localidade + ), 
        tipo (0:cliente, 1:instrutor, 2:rececionista)
        hash password
    */
