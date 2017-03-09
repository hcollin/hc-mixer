import React from 'react';

import { Mixer } from './components/mixer.jsx';
import { MasterBus } from './components/masterBus.jsx';
import { Pads } from './components/pads.jsx';
import { Tracker } from './components/tracker.jsx';

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
        <header className="main-header">
          <h1>HC Mixer</h1>
        </header>
        <div className="mixing-desk">
          <Mixer></Mixer>
          <MasterBus></MasterBus>
        </div>

        <div className="tool-section">
          <Tracker></Tracker>
          <Pads></Pads>
        </div>


      </div>
    )
  }
}
