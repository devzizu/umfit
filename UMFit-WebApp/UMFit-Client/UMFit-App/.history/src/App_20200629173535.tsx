import { IonApp, IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonInput, IonPage, IonRouterOutlet, IonSplitPane, IonText, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import sha256 from "fast-sha256";
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
import './components/css/LogIn.css';
import Menu from './components/MenuHome';
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
import { authenticate, getUserStatus, logout } from './models/API/UserAPI';
import { User } from './models/Other/User';
import About from './pages/About';
import ConsultarAulasGrupo from './pages/ConsultarAulasGrupo';
import Contact from './pages/Contact';
import './pages/css/404.css';
import './pages/css/Home.css';
import EditarUtilizador from './pages/funcionario/EditarUtilizador';
import InserirUtilizador from './pages/funcionario/InserirUtilizador';
import RemoveUser from './pages/funcionario/RemoveUser';
import CriarAvaliacao from './pages/instrutor/CriarAvaliacao';
import CriarPlanoAlimentar from './pages/instrutor/CriarPlanoAlimentar';
import CriarPlanoTreino from './pages/instrutor/CriarPlanoTreino';
import UltimaAvaliacaoInstrutor from './pages/instrutor/UltimaAvaliacaoInstrutor';
import UpdateDetails from './pages/UpdateDetails';
import AgendarAvaliacao from './pages/user/AgendarAvaliacao';
import Evolucao from './pages/user/EvolucaoPage/Evolucao';
import ShowPlanoTreino from './pages/user/ShowPlanoTreino';
import UltimaAvaliacao from './pages/user/UltimaAvaliacao';
import UserProfile from './pages/UserProfile';
/* Theme variables */
import './theme/variables.css';
import ShowPlanoAlimentar from './pages/user/ShowPlanoAlimentar';
import EditarAulasGrupo from './pages/funcionario/EditarAulasGrupo';









//---------------------------------------------------------------------------------------

class App extends React.Component {

  state: {
    selectedPage: string,
    menus: string,
    logged: boolean,
    loadingAPIcall: boolean,
    userLogged: User
  }
  
  setLogged = (logged: boolean, user: User) => {

    if (logged === false) {
      
      var lastToken = localStorage.getItem('token');

      if (lastToken)
        logout(lastToken);

      localStorage.clear();
    }

    var cat;
    var menuss;

    if (logged) {
      cat = user.categoria
      menuss = user.tipoDeUser === "Cliente" ? cat : user.tipoDeUser   
    }

    this.setState({ 
      logged: logged, 
      menus: logged ? menuss : 'home',
      userLogged: user
    });

  };

  constructor(props: any) {
    
    super(props);

    this.state = {
      selectedPage: '',
      menus: 'home',
      logged: false,
      loadingAPIcall: true,
      //loadingAPIcall: false,
      userLogged: new User("", "", -1, "", -1, "", "", "")
    };

  }


  async componentDidMount() {

    console.log("com..DidMount() -> updating state...");

    var tokenFromStorage = localStorage.getItem('token');
    console.log("TOKEN = " + tokenFromStorage);
    //existe token da sessao
    if (tokenFromStorage != null) {

      await getUserStatus(tokenFromStorage)
            .then(res => res.json())
            .then((data) => {

        const res = JSON.parse(data);

        if (res.status === "online") {
          
          var userMenus = res.user.categoria
          
          this.setState({
            logged: true,
            menus: res.user.tipoDeUser === "Cliente" ? userMenus : res.user.tipoDeUser,
            loadingAPIcall: false,
            userLogged: res.user
          });
        
        //Token invalido
        } else if (res.status === "offline") {

          localStorage.clear();

          this.setState({
            logged: false,
            menus: 'home',
            loadingAPIcall: false,
            userLogged: null,
          });
        
        }

      }).catch(function(error) {

        console.log(error);
      });   

    } else { //Nao existe token no localstorage

      this.setState({
        logged: false,
        menus: 'home',
        loadingAPIcall: false,
        userLogged: null,
      });
    
    }
  }

  render() {

    console.log("[...] Rendering App component...");

    var logged = this.state.logged;
    var user = this.state.userLogged;

    return (
        <IonApp>
          {
            this.state.loadingAPIcall  ?<div></div> : (
              <IonReactRouter basename ={process.env.PUBLIC_URL} >
            
              <IonSplitPane id="split-pane" contentId="main">
                <Menu selectedPage={this.state.selectedPage} menus={this.state.menus}/>
                  
                  <IonRouterOutlet id="main">
                  <Route path="/li4_umfit" component={(props: any) => {
                    return <Redirect to="/home" />;
                    }} />
                    <Route path="/home" component={(props: any) => {
                      
                      if (logged) {
                        
                        return <Redirect to="/profile" />;
                      } 
                      
                      return <Home logged={logged} {...props} setLogged={this.setLogged}/>;
    
                    }} />
                    
                    <Route path="/about" component={About} exact={true} />
                                        
                    <Route path="/contact" component={Contact} exact={true} />                          
                    
                    {/* Routas de teste como públicas, dps remover */}

                    {/* ------------------------------------------ */}

                    <Route path="/profile" component={(props: any) => {
                      
                      if (!logged) {
                        
                        return <Redirect to="/home" />;
                      }

                      switch(user.tipoDeUser) {

                        case 'Cliente': 

                          return <ProfileCliente setLogged={this.setLogged} user={this.state.userLogged}/>;

                        case 'Instrutor': 
                
                          return <ProfileTreinador setLogged={this.setLogged} user={this.state.userLogged}/>;

                        case 'Rececionista': 
                          
                          return <ProfileFuncionario setLogged={this.setLogged} user={this.state.userLogged}/>;                          

                        default: break;
                      }

                      return <ProfileCliente setLogged={this.setLogged} user={this.state.userLogged}/>;
    
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

class ProfileCliente extends React.Component<any> {

  state: {
    user: User
  }

  constructor(props: any) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }
  
  componentDidMount() {

    this.setState({
      user: this.props.user
    });
  }
  
  render() {

    return(
          this.state.user.categoria === "Premium" ? 
              <IonRouterOutlet>

                <Route path="/profile" render={() => {return <UserProfile user={this.state.user} />}} exact={true} />

                <Route path="/profile/evolucao" component={Evolucao} exact={true} />

                <Route path="/profile/mydetails" render={() => {return <UpdateDetails user={this.state.user} email={this.state.user.email} />}} exact={true} />

                <Route path="/profile/planoaulas" render={() => {return <ConsultarAulasGrupo user={this.state.user}  />}} exact={true} />
          
                <Route path="/profile/ultimaavaliacao" render={() => {return <UltimaAvaliacao user={this.state.user}/>}} exact={true} />

                <Route path="/profile/agendar" render={() => {return <AgendarAvaliacao email={this.state.user.email}/>}} exact={true} />

                <Route path="/profile/planostreino" render={() => {return <ShowPlanoTreino user={this.state.user}/>}} exact={true} />
                <Route path="/profile/planosalimentares" render={() => {return <ShowPlanoAlimentar user={this.state.user}/>}} exact={true} />

                <Route path="/profile/logout" component={() => {return <LogOut setLogged={this.props.setLogged}/>}} exact={true} />
          
                <Route path='*' exact={true} component={Component404} />

              </IonRouterOutlet>
        :
              <IonRouterOutlet>

              <Route path="/profile" render={() => {return <UserProfile user={this.state.user} />}} exact={true} />

              <Route path="/profile/evolucao" component={Evolucao} exact={true} />

              <Route path="/profile/mydetails" render={() => {return <UpdateDetails user={this.state.user} email={this.state.user.email} />}} exact={true} />

              <Route path="/profile/planoaulas" render={() => {return <ConsultarAulasGrupo user={this.state.user}  />}} exact={true} />
          
              <Route path="/profile/ultimaavaliacao" render={() => {return <UltimaAvaliacao user={this.state.user}/>}} exact={true} />

              <Route path="/profile/agendar" render={() => {return <AgendarAvaliacao email={this.state.user.email}/>}} exact={true} />

              <Route path="/profile/logout" component={() => {return <LogOut setLogged={this.props.setLogged}/>}} exact={true} />
        
              <Route path='*' exact={true} component={Component404} />

            </IonRouterOutlet>

    );    
  }

}

class ProfileFuncionario extends React.Component<any> {

  state: {
    user: User
  }


  constructor(props: any) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  componentDidMount() {

    this.setState({
      user: this.props.user
    });
  }

  render() {

    return(
              
        <IonRouterOutlet>

          <Route path="/profile" render={() => {return <UserProfile user={this.state.user} />}} exact={true} />

          <Route path="/profile/novouser" component={InserirUtilizador} exact={true} />

          <Route path="/profile/editaruser" render={() => {return <EditarUtilizador email={this.state.user.email}/>}} exact={true} />

          <Route path="/profile/removeruser" render={() => {return <RemoveUser email={this.state.user.email}/>}} exact={true} />

          <Route path="/profile/mydetails" render={() => {return <UpdateDetails user={this.state.user} email={this.state.user.email} />}} exact={true} />
          <Route path="/profile/logout" component={() => {return <LogOut setLogged={this.props.setLogged}/>}} exact={true} />
          <Route path="/profile/editaraulas" component={EditarAulasGrupo} exact={true} />

          <Route path='*' exact={true} component={Component404} />

        </IonRouterOutlet>
      
    );    
  }

}

class ProfileTreinador extends React.Component<any> {

  state: {
    user: User
  }


  constructor(props: any) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }
  
  componentDidMount() {

    this.setState({
      user: this.props.user
    });
  }
  
  render() {

    return(
              
        <IonRouterOutlet>

          <Route path="/profile" render={() => {return <UserProfile user={this.state.user} />}} exact={true} />

          <Route path="/profile/mydetails" render={() => {return <UpdateDetails user={this.state.user} email={this.state.user.email} />}} exact={true} />
          
          <Route path="/profile/planotreino" component={CriarPlanoTreino}  exact={true}/>

          <Route path="/profile/planoalimentar" component={CriarPlanoAlimentar}  exact={true}/>

          <Route path="/profile/planoaulas" render={() => {return <ConsultarAulasGrupo user={this.state.user}  />}} exact={true} />
         
          <Route path="/profile/avaliacaocliente" component={UltimaAvaliacaoInstrutor} exact={true} />

          <Route path="/profile/criaravaliacao" render={() => { return <CriarAvaliacao user={this.state.user} /> } } exact={true} />

          <Route path="/profile/logout" component={() => {return <LogOut setLogged={this.props.setLogged}/>}} exact={true} />

          <Route path='*' exact={true} component={Component404} />

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
    rememberMe: boolean,
    loading : boolean
  }

  constructor(props: any) {
    
    super(props);

    this.state = {
      emailValue: "",
      passwordValue: "",
      rememberMe: false,
      loading : false
    }
  }

  render() {


    return (


      <div id="login-form">
              <IonLoading
      isOpen={this.state.loading}
      onDidDismiss={() => {this.setState({loading: false})}}
      message={'A iniciar sessão...'}
    />
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
      <div>
      <IonButton expand="block" type="submit" id="login-button" onClick={async () => {

              this.setState({loading : true});

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
                          
                          const resValue = JSON.parse(value);
                          
                          localStorage.setItem('token', resValue.token);

                          var user: User = resValue.user;

                          console.log(user.tipoDeUser);

                          this.props.setLogged(true, user);
                          this.setState({loading: false});
                      });

                  //Login error: 401    
                  } else {
                    this.setState({loading: false});
                      alert("E-mail ou password incorretos...");

                  }
              }).catch(function(error) {
                this.setState({loading: false});
                alert("Server is currently down... \n\n".concat("Error details: \n\n\t").concat(error));
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


class Component404 extends React.Component {

  render() {

    return (

      <IonPage>


        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">404 - Página inexistente</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>

            <IonCard className="wrapper">

              <IonCardHeader className="card404">
                <img src={require('./imgs/404_icon.png')} width="20%" height="250" alt="Loading..."/> 
              </IonCardHeader>

              <IonCardContent className="card404">
                A página que está a tentar aceder foi removida ou não existe...saia do sistema e volte a tentar de novo.
              </IonCardContent>
          </IonCard>
          
        </IonContent>

      </IonPage>

    );

  }
}
// a85729@alunos.uminho.pt STD
// a83719@alunos.uminho.pt PRM
// a85227@alunos.uminho.pt INS
// a84656@alunos.uminho.pt REC
