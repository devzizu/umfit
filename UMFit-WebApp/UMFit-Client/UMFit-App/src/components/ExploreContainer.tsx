import React from 'react';
import './ExploreContainer.css';
import { userInfo } from 'os';
import { IonInput, IonTitle, IonButton } from '@ionic/react';

interface ContainerProps { }

//https://dev.to/camilomejia/fetch-data-with-react-hooks-and-typescript-390c

export interface User {
  name: string,
  eMail: string,
  password: string
}

class ExploreContainer extends React.Component {

  state = {
    users: [],
    url: 'https://192.168.1.67:5001/api/user'
  }

  componentDidMount() {

    let data: User[];

    fetch(this.state.url, {
      method: "GET"
    })
    .then(res => res.json())
    .then((res: User[]) => data = res)
    .then(res => this.setState({
      users: res 
    }));       
  }

  sendEchoToServer() {

    fetch('https://192.168.1.67:5001/api/user', {
      method: 'POST',
      body: "ola"
    })
    .then(res => console.log(res.json()));
  }

  render() {
    return (
        <>
        <br></br>
        <br></br>
        <IonTitle class="ion-text-center">(1) Informação carregada de {this.state.url}</IonTitle>
        <br></br>
        <br></br>
        <div>
          <ul>
            {this.state.users.map((user: User) => {
              return <li key={user.eMail}>
            {
            <>
              <strong>{"Utilizador : " + user.name}</strong>
              <p>{"E-MAIL     : " + user.eMail}</p>
              <p>{"Password   : " + user.password}</p>
            </>
            }</li>
          })}
        </ul>
      </div>
      <div>
      <br></br>
      <IonTitle class="ion-text-center">(2) Enviar um HTTP POST</IonTitle>
        <IonInput class="ion-text-center" placeholder="Inserir a mensagem aqui:"></IonInput>
        <IonButton onClick={this.sendEchoToServer}>Enviar</IonButton>
        <br></br>
        <br></br>
        Resposta: 
      </div>
      </>
    );
  }


};

export default ExploreContainer;
