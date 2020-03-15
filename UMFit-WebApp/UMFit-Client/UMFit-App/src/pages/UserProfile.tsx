
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import React from "react";
import { User } from "../models/Other/User";

import './css/UserProfile.css';

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

        <div id="main-div-top">
            
            <div id="left-profile-pic"></div>
            
            <div id="right-profile-info"> 

              <b>Nome:</b> {this.state.user.nome}
              <br></br>
              <b>E-Mail:</b> {this.state.user.email}
              <br></br>
              <b>Tipo de cliente:</b> {this.state.user.categoria}
              <br></br>
              <b>Localidade:</b> {this.state.user.localidade}
              <br></br>
              <b>Data de Nascimento:</b> {this.state.user.data_nascimento}
              <br></br>
              <b>Genero:</b> {this.state.user.genero===1 ? "Masculino" : "Femenino"}
              <br></br>
              <b>Nif:</b> {this.state.user.nif}
              <br></br>
            </div>

        </div>

        </IonContent>


        </IonPage>
    );
  }
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
