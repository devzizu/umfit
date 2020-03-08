import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
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
import '../../theme/variables.css';
import MenuProfile from '../Menus/MenuProfile';
import Main from '../../pages/Main';

const AppProfile: React.FC = () => {

  const [selectedPage] = useState('');

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane id="split-pane" contentId="main">
          <MenuProfile selectedPage={selectedPage} />
            <IonRouterOutlet id="main">
              <Route path="/home" component={Main} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/main" />} />
              <Route path='*' render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppProfile;
