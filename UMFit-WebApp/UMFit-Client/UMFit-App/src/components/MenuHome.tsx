import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { chevronForward } from 'ionicons/icons';

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
    iosIcon: chevronForward,
    mdIcon: chevronForward
  }, 
  {
    title: 'Sobre',
    url: '/about',
    iosIcon: chevronForward,
    mdIcon: chevronForward
  },
  {
    title: 'Contacto',
    url: '/contact',
    iosIcon: chevronForward,
    mdIcon: chevronForward
  }
];

const appPagesUser: AppPage[] = [
  {
    title: 'O meu perfil',
    url: '/profile',
    iosIcon: chevronForward,
    mdIcon: chevronForward
  },
  {
    title: 'Planos (not implemented)',
    url: '/planos',
    iosIcon: chevronForward,
    mdIcon: chevronForward
  },
  {
    title: 'Log-Out',
    url: '/logout',
    iosIcon: chevronForward,
    mdIcon: chevronForward
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
          {
            menus === 'home' ? (
              appPagesHome.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                      <IonIcon slot="start" icon={appPage.iosIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              }
            )
            ) : (
              appPagesUser.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                      <IonIcon slot="start" icon={appPage.iosIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              }
            )
        )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
