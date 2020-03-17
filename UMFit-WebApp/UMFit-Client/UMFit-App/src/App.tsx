import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, IonPage, IonHeader, IonToolbar, IonTitle, IonText, IonInput, IonButton, IonItem, IonCheckbox, IonLabel } from '@ionic/react';
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

import { authenticate, getUserStatus, logout } from './models/API/UserAPI';
import { User } from './models/Other/User';

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

  state: {
    selectedPage: string,
    menus: string,
    logged: boolean,
    loadingAPIcall: boolean,
    userLogged: User
  }

  setLogged = (logged: boolean) => {

    if (logged === false) {

      logout(this.state.userLogged.email);      
      localStorage.clear();
    }

    this.setState({ 
      logged: logged, 
      menus: logged ? 'user' : 'home'
    });

  };

  setUser = (user: User) => {

    this.setState({
      userLogged: user      
    });
  }

  constructor(props: any) {
    
    super(props);

    this.state = {
      selectedPage: '',
      menus: 'home',
      logged: false,
      loadingAPIcall: true,
      userLogged: new User("", "", -1, "", -1, "", "", "")
    };

  }

  async componentDidMount() {

    console.log("com..DidMount() -> updating state...");

    //await getUserStatus(this.state.userLogged.email)
    //await getUserStatus("test")

    var emailFromStorage = localStorage.getItem('email');

    if (emailFromStorage === null) 
      emailFromStorage = this.state.userLogged.email
    else {
      var userFromStorage = localStorage.getItem('user');
      if (userFromStorage != null) {
        this.setState({
          userLogged: JSON.parse(userFromStorage)
        });  
      }
    }

    await getUserStatus(emailFromStorage)
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
                      
                      return <Home logged={logged} {...props} setLogged={this.setLogged} setUser={this.setUser} />;
    
                    }} />
                    <Route path="/about" component={About} exact={true} />
                    <Route path="/contact" component={Contact} exact={true} />                          
    
                    <Route path="/profile" component={(props: any) => {
                      
                      if (!logged) {
                        
                        return <Redirect to="/home" />;
                      }
    
                      return <Profile setLogged={this.setLogged} user={this.state.userLogged}/>;
    
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

        <LogInForm logged={this.props.logged} history={this.props.history} setLogged={this.props.setLogged} setUser={this.props.setUser}/>

      </IonPage>
    );
  }

};

//---------------------------------------------------------------------------------------

class Profile extends React.Component<any> {

  state = {
    user: User
  }

  constructor(props: any) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {

    return(
              
        <IonRouterOutlet>

          <Route path="/profile" render={() => {return <UserProfile user={this.state.user} />}} exact={true} />

          <Route path="/profile/logout" component={() => {return <LogOut setLogged={this.props.setLogged}/>}} exact={true} />

        </IonRouterOutlet>
      
    );    
  }

}
//---------------------------------------------------------------------------------------

class LogOut extends React.Component<any> {

  componentDidMount() {
    this.props.setLogged(false);
  }

  render() {
    return <div></div>;
  }
}

//---------------------------------------------------------------------------------------

class LogInForm extends React.Component<any> {

  state: {
    emailValue: string,
    passwordValue: string,
    rememberMe: boolean
  }

  constructor(props: any) {
    
    super(props);

    this.state = {
      emailValue: "",
      passwordValue: "",
      rememberMe: false
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
          <br></br>
          <IonItem>
            <IonCheckbox color="primary" slot="start" onIonChange={(e) => {
                this.setState({
                  rememberMe: (e.target as HTMLInputElement).checked
                });
            }}></IonCheckbox>
            <IonLabel>Remember me</IonLabel>
          </IonItem>
      </div>
      <div>
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
                          
                          var user: User = value;

                          this.props.setLogged(true);
                          this.props.setUser(user);

                          localStorage.setItem("email", user.email);
                          localStorage.setItem("user", JSON.stringify(user));

                          //this.props.history.replace("/profile");
                      });

                  //Login error: 400    
                  } else {

                      alert("E-mail ou password incorretos...");

                  }
              });

              //for debug
              //this.props.setLogged(true);

          }
      }>
          Log-In
      </IonButton>
      </div>
    </div> 
  );
  }

  
};