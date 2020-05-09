import { IonContent, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonTitle, IonToolbar } from '@ionic/react';
import { addCircleOutline, analyticsOutline, barbellOutline, buildOutline, calendarOutline, callOutline, closeCircleOutline, documentsOutline, documentTextOutline, helpCircleOutline, keyOutline, logInOutline, logOutOutline, personOutline, pizzaOutline } from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './css/MenuHome.css';


interface MenuProps extends RouteComponentProps {
  selectedPage: string;
  menus: string;
}

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPagesHome: AppPage[] = [
  {
    title: 'Iniciar Sessão',
    url: '/home',
    iosIcon: logInOutline,
    mdIcon: logInOutline
  }, 
  {
    title: 'Sobre',
    url: '/about',
    iosIcon: helpCircleOutline,
    mdIcon: helpCircleOutline
  },
  {
    title: 'Contacto',
    url: '/contact',
    iosIcon: callOutline,
    mdIcon: callOutline
  }
];

const appPagesClientePremium: AppPage[] = [
  {
    title: 'O meu perfil',
    url: '/profile',
    iosIcon: personOutline,
    mdIcon: personOutline
  },
  {
    title: 'Plano de Aulas',
    url: '/profile/planoaulas',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'Atualizar perfil',
    url: '/profile/mydetails',
    iosIcon: keyOutline,
    mdIcon: keyOutline
  },
  {
    title: 'Evolução',
    url: '/profile/evolucao',
    iosIcon: analyticsOutline,
    mdIcon: analyticsOutline
  },
  {
    title: 'Última Avaliação',
    url: '/profile/ultimaavaliacao',
    iosIcon: documentTextOutline,
    mdIcon: documentTextOutline
  },
  {
    title: 'Agendar Avaliação',
    url: '/profile/agendar',
    iosIcon: callOutline,
    mdIcon: callOutline
  },
  {
    title: 'Meus planos de treino',
    url: '/profile/planostreino',
    iosIcon: documentsOutline,
    mdIcon: documentsOutline
  },
  {
    title: 'Meus planos Alimentares',
    url: '/profile/planosalimentares',
    iosIcon: pizzaOutline,
    mdIcon: pizzaOutline
  },
  {
    title: 'Log-Out',
    url: '/profile/logout',
    iosIcon: logOutOutline,
    mdIcon: logOutOutline
  }
];

const appPagesClienteStandard: AppPage[] = [
  {
    title: 'O meu perfil',
    url: '/profile',
    iosIcon: personOutline,
    mdIcon: personOutline
  },
  {
    title: 'Plano de Aulas',
    url: '/profile/planoaulas',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'Atualizar perfil',
    url: '/profile/mydetails',
    iosIcon: keyOutline,
    mdIcon: keyOutline
  },
  {
    title: 'Evolução',
    url: '/profile/evolucao',
    iosIcon: analyticsOutline,
    mdIcon: analyticsOutline
  },
  {
    title: 'Última Avaliação',
    url: '/profile/ultimaavaliacao',
    iosIcon: documentTextOutline,
    mdIcon: documentTextOutline
  },
  {
    title: 'Agendar Avaliação',
    url: '/profile/agendar',
    iosIcon: callOutline,
    mdIcon: callOutline
  },

  {
    title: 'Log-Out',
    url: '/profile/logout',
    iosIcon: logOutOutline,
    mdIcon: logOutOutline
  }
];

const appPagesFuncionario: AppPage[] = [
  {
    title: 'O meu perfil',
    url: '/profile',
    iosIcon: personOutline,
    mdIcon: personOutline
  },
  {
    title: 'Plano de Aulas',
    url: '/profile/planoaulas',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'Atualizar perfil',
    url: '/profile/mydetails',
    iosIcon: keyOutline,
    mdIcon: keyOutline
  },
  {
    title: 'Criar Utilizador',
    url: '/profile/novouser',
    iosIcon: addCircleOutline,
    mdIcon: addCircleOutline
  },
  {
    title: 'Editar Utilizador',
    url: '/profile/editaruser',
    iosIcon: buildOutline,
    mdIcon: buildOutline
  },
  {
    title: 'Remover Utilizador',
    url: '/profile/removeruser',
    iosIcon: closeCircleOutline,
    mdIcon: closeCircleOutline
  },
  {
    title: 'Log-Out',
    url: '/profile/logout',
    iosIcon: logOutOutline,
    mdIcon: logOutOutline
  }
];

const appPagesTreinador: AppPage[] = [
  {
    title: 'O meu perfil',
    url: '/profile',
    iosIcon: personOutline,
    mdIcon: personOutline
  },
  {
    title: 'Plano de Aulas',
    url: '/profile/planoaulas',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'Atualizar perfil',
    url: '/profile/mydetails',
    iosIcon: keyOutline,
    mdIcon: keyOutline
  },
  {
    title: 'Criar plano de treino',
    url: '/profile/planotreino',
    iosIcon: barbellOutline,
    mdIcon: barbellOutline
  },
  {
    title: 'Criar plano alimentar',
    url: '/profile/planoalimentar',
    iosIcon: pizzaOutline,
    mdIcon: pizzaOutline
  },
  {
    title: 'Criar avaliação',
    url: '/profile/criaravaliacao',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'Consultar Avaliação de Cliente',
    url: '/profile/avaliacaocliente',
    iosIcon: analyticsOutline,
    mdIcon: analyticsOutline
  },
  {
    title: 'Log-Out',
    url: '/profile/logout',
    iosIcon: logOutOutline,
    mdIcon: logOutOutline
  }
];

const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage, menus }) => {

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>UMFit</IonListHeader>
          <br></br>
          <IonNote>Ginásio da Universidade do Minho</IonNote>
          {( () => {

              var menuElements: JSX.Element[] = [];

              switch(menus) {

                case 'home': 
                  
                menuElements = appPagesHome.map((appPage, index) => {
                  
                  return(
                    <IonMenuToggle key={index} autoHide={false}>
                    <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                      <IonIcon slot="start" icon={appPage.iosIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                    </IonMenuToggle>
                  )});
                  break;
                  case 'Premium': 
                  menuElements = appPagesClientePremium.map((appPage, index) => {
                      return (
                        <IonMenuToggle key={index} autoHide={false}>
                          <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                            <IonIcon slot="start" icon={appPage.iosIcon} />
                            <IonLabel>{appPage.title}</IonLabel>
                          </IonItem>
                        </IonMenuToggle>
                      )});  
                      break;
                      case 'Standard': 
                      menuElements = appPagesClienteStandard.map((appPage, index) => {
                          return (
                            <IonMenuToggle key={index} autoHide={false}>
                              <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                <IonIcon slot="start" icon={appPage.iosIcon} />
                                <IonLabel>{appPage.title}</IonLabel>
                              </IonItem>
                            </IonMenuToggle>
                          )});  
                          break;
                        case 'Instrutor': 
                    menuElements = appPagesTreinador.map((appPage, index) => {
                        return (
                          <IonMenuToggle key={index} autoHide={false}>
                            <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                              <IonIcon slot="start" icon={appPage.iosIcon} />
                              <IonLabel>{appPage.title}</IonLabel>
                            </IonItem>
                          </IonMenuToggle>
                        )});
                        break;
                      case 'Rececionista': 
                      menuElements = appPagesFuncionario.map((appPage, index) => {
                          return (
                            <IonMenuToggle key={index} autoHide={false}>
                              <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                <IonIcon slot="start" icon={appPage.iosIcon} />
                                <IonLabel>{appPage.title}</IonLabel>
                              </IonItem>
                            </IonMenuToggle>
                          )});  
                          break;
                  }

                  return menuElements;
            }
          ) ()}
        </IonList>
      </IonContent>
      <IonFooter className="footer">
          <IonToolbar class="ion-text-center">
            <IonTitle className="text-footer" size="small">© 2020 UMFit</IonTitle>
          </IonToolbar>
        </IonFooter>

    </IonMenu>
    
  );
};

export default withRouter(Menu);
