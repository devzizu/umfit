import React from 'react';
import './ExploreContainer.css';

interface ContainerProps { }

//https://dev.to/camilomejia/fetch-data-with-react-hooks-and-typescript-390c

class ExploreContainer extends React.Component {

  state = {
    users: [],
    loading: true,
    error: false
  }

  componentDidMount() {
  
    const url = 'https://192.168.1.67:5001/api/user';

    fetch(url)
    .then(res => res.json())
    .then(res => console.log(res));
  
  }

  render() {

      return (
        <div className="container">
                <strong>Ready to create an app?</strong>
                <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
        </div>
      );
  }


};

export default ExploreContainer;
