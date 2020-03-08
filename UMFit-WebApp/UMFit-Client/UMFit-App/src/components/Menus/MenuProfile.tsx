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
  import '../css/MenuProfile.css';
  
  interface MenuProps extends RouteComponentProps {
    selectedPage: string;
  }
  
  interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
  }
  
  const appPages: AppPage[] = [
    {
      title: 'asfdsafd',
      url: '/home',
      iosIcon: chevronForward,
      mdIcon: chevronForward
    }, 
    {
      title: 'asd',
      url: '/about',
      iosIcon: chevronForward,
      mdIcon: chevronForward
    },
    {
      title: 'Contasddsaacto',
      url: '/contact',
      iosIcon: chevronForward,
      mdIcon: chevronForward
    } 
  ];
  
  const MenuProfile: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {
  
    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>UMFit</IonListHeader>
            <br></br>
            <IonNote>Ginásio da Universidade do Minho</IonNote>
            {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" icon={appPage.iosIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>
        </IonContent>
      </IonMenu>
    );
  };
  
  export default withRouter(MenuProfile);
  