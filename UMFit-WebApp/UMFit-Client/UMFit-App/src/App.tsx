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
import './theme/variables.css';

import Menu from './components/Menu';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';

const App: React.FC = () => {

  const [selectedPage] = useState('');

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane id="split-pane" contentId="main">
          <Menu selectedPage={selectedPage} />
            <IonRouterOutlet id="main">
              <Route path="/home" component={Home} exact={true} />
              <Route path="/about" component={About} exact={true} />
              <Route path="/contact" component={Contact} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path='*' render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

/*
  <IonApp>
     <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
*/