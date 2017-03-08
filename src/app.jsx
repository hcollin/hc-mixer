import React from 'react';

import { Mixer } from './components/mixer.jsx';
import { MasterBus } from './components/masterBus.jsx';
import { Pads } from './components/pads.jsx';

// Styles
import '../styles/index.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { commands: [] };

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

        <div className="tool-section">
          <Pads></Pads>
        </div>


      </div>
    )
  }
}
