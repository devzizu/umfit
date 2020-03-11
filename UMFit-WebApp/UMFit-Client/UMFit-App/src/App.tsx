import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonText, IonInput, IonButton, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

import { authenticate, getUserStatus } from './models/API/UserAPI';
import { User, formatUser } from './models/Other/User';

import sha256 from "fast-sha256";

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

import './components/css/LogIn.css';
import './pages/css/Home.css';

import Menu from './components/MenuHome';
import About from './pages/About';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';

//---------------------------------------------------------------------------------------

class App extends React.Component {

  state = {
    selectedPage: "home",
    menuGroup: "home",
    isLogged: false
  }

  async componentDidMount() {
    
    let json = getUserStatus("test").then(res => res.json());

    let json_value = await json.then(function(value) {return value}); 

    let s: string = await json_value.status;

    this.setState({
      isLogged: s === "online"
    });
  }
  
  render() {

    return (
      <IonApp>
        <IonReactRouter>
          
          <IonSplitPane id="split-pane" contentId="main">
            <Menu selectedPage={this.state.selectedPage} menus={this.state.menuGroup}/>
              
              <IonRouterOutlet id="main">
                
                <Route path="/home" component={Home} exact={true} />
                <Route path="/about" component={About} exact={true} />
                <Route path="/contact" component={Contact} exact={true} />
                
                <Route path='/profile' render={async () => {

                  return this.state.isLogged ? <Profile /> : <Redirect to='/home' />;

                }}/>

                <Route exact path="/" render={() => <Redirect to="/home" />} />

              </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    );
    }
};

export default App;

//---------------------------------------------------------------------------------------

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
      <LogIn />
      </IonPage>
    );
  }

};

//---------------------------------------------------------------------------------------

class Profile extends React.Component {

  render() {
    
    return(
      
      <IonSplitPane id="split-pane" contentId="main">
      <Menu selectedPage={'profile'} menus={'user'}/>
        
        <IonRouterOutlet id="main">

          <Route path="/profile" component={UserProfile} exact={true} />

          <Route path="/aval" component={UserProfile} exact={true} />
                
          <Route path="/planos" component={UserProfile} exact={true} />

        </IonRouterOutlet>
      
      </IonSplitPane>
    );    
  }

}

//---------------------------------------------------------------------------------------

const LogIn: React.FC = () => {

  const [showLoading, setShowLoading] = useState(false);
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

  setTimeout(() => {
      setShowLoading(false);
  }, 2000);
  
  return (

      <div id="login-form">
          <div id="Logo"></div>
          <div id="phrase">
              <IonText>O teu ginásio da UMinho...</IonText>
          </div>
      <div id="input-form">
          <br></br>
          <IonInput required type="email" id="email-input" placeholder="E-Mail"
          value={emailValue}
          onIonChange={(e) => {
              setEmailValue((e.target as HTMLInputElement).value);
          }}>
          </IonInput>
          <br></br>
          <IonInput required type="password" id="pass-input" placeholder="Password"
          value={passwordValue}
          onIonChange={(e) => {
              setPasswordValue((e.target as HTMLInputElement).value);
          }}>
          </IonInput>
      </div>
      <IonButton expand="block" type="submit" id="login-button" onClick={async () => {
              
              setShowLoading(true);

              let pass_enc = new TextEncoder();
              let encoded = pass_enc.encode(passwordValue);
              let hash256 = Buffer.from(sha256(encoded)).toString('hex').toUpperCase();

              console.log("Para a API: /api/user/authenticate");
              console.log("> E-Mail: " + emailValue);
              console.log("> Password: " + passwordValue);
              console.log("> Password (sha256): " + hash256);

              //request
              let response = authenticate(emailValue, passwordValue);

              await response.then(async function(value) {
                  
                  //Success OK = 200    
                  if (value.status === 200) {
                                   
                      var json = value.json();
                      
                      await json.then(async function(value) {
                          
                          let user: User = formatUser(value);
                          
                          console.log(user);
   
                      });

                  //Login error: 400    
                  } else {

                      alert("E-mail ou password incorretos...");

                  }
              });

          }
      }>
          Log-In
      </IonButton>

          <IonLoading
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Espere um momento...'}
              duration={5000}
          />
      </div> 
  );
  
};
