
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonGrid, IonRow, IonCol, IonCardContent, IonFooter } from "@ionic/react";
import React from "react";
import { User } from "../models/Other/User";

import './css/UserProfile.css';
import { mailOutline, femaleOutline, maleOutline, locationOutline, calendarOutline, cardOutline, informationCircleOutline } from "ionicons/icons";

class UserProfile extends React.Component<any> {

  state: {
    user: User
  }

  constructor(props: any) {

    super(props);

    this.state = {
      user: this.props.user
    }

  }

  componentDidMount() {

    console.log("In user profile:");
    console.log(this.props.user);

    //debug
    this.setState({
      user: this.props.user
      //user: getTestValueUser()
    });

  }

  render() {

    return(

    <IonPage>
            
            <IonHeader>
                <IonToolbar color="primary">
                  <IonTitle id="page-title">Olá {this.state.user.nome}!</IonTitle>
                </IonToolbar>
            </IonHeader>
        
        <IonContent>

        <IonGrid>

          {/* ------------------------------------------------------------------------- */}

            <IonRow>

              <IonCol>

                <IonCard>

                  <IonCardHeader className="cardFirst">

                    <img className="profilePic" src={require('../imgs/perfil_pic.png')} alt="Loading..."/>
                    
                    <IonCardSubtitle>{this.state.user.categoria}</IonCardSubtitle>
                    <IonCardTitle>{this.state.user.nome}</IonCardTitle>

                  </IonCardHeader>


                </IonCard>

              </IonCol>

            </IonRow>

            <IonRow>

                <IonCol>

                    <IonCard className="cardSecond">

                      <IonCardContent>

                          <IonIcon slot="start" icon={informationCircleOutline} />
                        <b>&nbsp;</b><b>Tipo de utilizador: </b>{this.state.user.tipoDeUser}
                        <br></br>
                        <br></br>
                        <IonIcon slot="start" icon={mailOutline} />
                        <b> E-Mail:</b> {this.state.user.email}
                        <br></br>
                        {
                          this.state.user.genero === 1 ?
                          <IonIcon slot="start" icon={maleOutline} />
                          :
                          <IonIcon slot="start" icon={femaleOutline} />
                        }
                        <b> Género:</b> {this.state.user.genero===1 ? "Masculino" : "Feminino"}
                        <br></br>
                        <IonIcon slot="start" icon={locationOutline} />
                        <b> Localidade:</b> {this.state.user.localidade}
                        <br></br>
                        <IonIcon slot="start" icon={calendarOutline} />
                        <b> Data de Nascimento:</b> {this.state.user.data_nascimento}
                        <br></br>
                        <IonIcon slot="start" icon={cardOutline} />
                        <b> NIF:</b> {this.state.user.nif}

                      </IonCardContent>

                    </IonCard>

                </IonCol>

            </IonRow>
            
          {/* ------------------------------------------------------------------------- */}
          <IonRow>

            <IonCol>

                <IonCard className="cardSecond">

                  <IonCardContent>

                      (more info soon...)

                  </IonCardContent>

                </IonCard>

            </IonCol>

            </IonRow>          
          </IonGrid>

          </IonContent>
          <IonFooter>
          <IonToolbar class="ion-text-center">
            <IonTitle border-top size="small">© UMFit 2020</IonTitle>
          </IonToolbar>
        </IonFooter>
        </IonPage>
    );
  }
}

/*
<IonContent class="background-image"></IonContent>
*/

export default UserProfile;

