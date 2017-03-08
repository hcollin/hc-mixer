import React from 'react';

import { Mixer } from './components/mixer.jsx';
import { MasterBus } from './components/masterBus.jsx';


// Styles
import '../styles/index.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (

      <div className="root-container">
        <header>
          
        </header>
        <div className="mixing-desk">
          <Mixer></Mixer>
          <MasterBus></MasterBus>
        </div>


      </div>
    )
  }
}
