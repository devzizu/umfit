import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, IonPage, IonHeader, IonToolbar, IonTitle, IonText, IonInput, IonButton } from '@ionic/react';
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
import { User } from './models/Other/User';

import sha256 from "fast-sha256";

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

import './components/css/LogIn.css';
import './pages/css/Home.css';

import Menu from './components/MenuHome';
import About from './pages/About';
import Contact from './pages/Contact';
import UserProfile, { Avaliacoes } from './pages/UserProfile';

//---------------------------------------------------------------------------------------

class App extends React.Component {

  state: {
    selectedPage: string,
    menus: string,
    logged: boolean,
    loadingAPIcall: boolean
  }

  setLogged = (logged: boolean) => {

    this.setState({ logged: logged, menus: logged ? 'user' : 'home' });

  };

  constructor(props: any) {
    
    super(props);

    this.state = {
      selectedPage: '',
      menus: 'home',
      logged: false,
      loadingAPIcall: true
    };

  }

  async componentDidMount() {

    console.log("com..DidMount() -> updating state...");

    await getUserStatus("test")
      .then(res => res.json())
      .then((data) => {

        if (data.status === "online") {
          this.setState({
            logged: true,
            menus: 'user',
            loadingAPIcall: false
          });
        } else {
          this.setState({

            logged: false,
            menus: 'home',
            loadingAPIcall: false
          });
        }

      });

      console.log("VERIFICACAO");

    }

  render() {

    console.log("[...] Rendering App component...");

    var logged = this.state.logged;

    return (
        <IonApp>
          {
            this.state.loadingAPIcall ? <div></div> : (
              <IonReactRouter>
            
              <IonSplitPane id="split-pane" contentId="main">
                <Menu selectedPage={this.state.selectedPage} menus={this.state.menus}/>
                  
                  <IonRouterOutlet id="main">
                    
                    <Route path="/home" component={(props: any) => {
                      
                      if (logged) {
                        
                        return <Redirect to="/profile" />;
                      } 
                      
                      return <Home logged={logged} {...props} setLogged={this.setLogged} />;
    
                    }} />
                    <Route path="/about" component={About} exact={true} />
                    <Route path="/contact" component={Contact} exact={true} />                          
    
                    <Route path="/profile" component={(props: any) => {
                      
                      console.log("logged = " + logged);

                      if (!logged) {
                        
                        return <Redirect to="/home" />;
                      }
    
                      return <Profile />;
    
                    }} />
    
                    <Redirect exact from="/" to="/home" />
                  
                  </IonRouterOutlet>
                  
    
              </IonSplitPane>
            </IonReactRouter>
                
            )
          }
        </IonApp>
      );
  }
};

export default App;

//---------------------------------------------------------------------------------------

class Home extends React.Component<any> {

  render() {

    return (
      <IonPage>


        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">UMFit</IonTitle>
          </IonToolbar>
        </IonHeader>

        <LogInForm logged={this.props.logged} history={this.props.history} setLogged={this.props.setLogged}/>

      </IonPage>
    );
  }

};

//---------------------------------------------------------------------------------------

class Profile extends React.Component {

  render() {
    
    return(
              
        <IonRouterOutlet>

          <Route path="/profile" component={UserProfile} exact={true} />

          <Route path="/profile/aval" component={Avaliacoes} exact={true} />

        </IonRouterOutlet>
      
    );    
  }

}

//---------------------------------------------------------------------------------------

class LogInForm extends React.Component<any> {

  state: {
    emailValue: string,
    passwordValue: string
  }

  constructor(props: any) {
    
    super(props);

    this.state = {
      emailValue: "",
      passwordValue: ""
    }
  }

  componentDidMount() {

    console.log(this.props.history);

    if (this.props.logged) {

      this.props.history.push("/profile");


    }

  }

  render() {

    return (
      
      <div id="login-form">
          <div id="Logo"></div>
          <div id="phrase">
              <IonText>O teu ginásio da UMinho...</IonText>
          </div>
      <div id="input-form">
          <br></br>
          <IonInput required type="email" id="email-input" placeholder="E-Mail"
          value={this.state.emailValue}
          onIonChange={(e) => {
             
            this.setState({
              emailValue: (e.target as HTMLInputElement).value,
            });

          }}>
          </IonInput>
          <br></br>
          <IonInput required type="password" id="pass-input" placeholder="Password"
          value={this.state.passwordValue}
          onIonChange={(e) => {

            this.setState({
              passwordValue: (e.target as HTMLInputElement).value,
            });

          }}>
          </IonInput>
      </div>
      <IonButton expand="block" type="submit" id="login-button" onClick={async () => {
              
              //setShowLoading(true);

              let pass_enc = new TextEncoder();
              let encoded = pass_enc.encode(this.state.passwordValue);
              let hash256 = Buffer.from(sha256(encoded)).toString('hex').toUpperCase();

              console.log("Para a API: /api/user/authenticate");
              console.log("> E-Mail: " + this.state.emailValue);
              console.log("> Password: " + this.state.passwordValue);
              console.log("> Password (sha256): " + hash256);

              //request
              let response = authenticate(this.state.emailValue, this.state.passwordValue);

              await response.then(async (value) => {
                  
                  //Success OK = 200    
                  if (value.status === 200) {
                                   
                      var json = value.json();
                      //var json: User = await value.json();
                     
                      await json.then((value) => {
                          
                          let user: User = value;
                          
                          console.log(user);

                          this.props.setLogged(true);

                          //this.props.history.replace("/profile");
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
      </div> 
  );
  }

  
};
