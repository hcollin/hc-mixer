import React from 'react';

import { Mixer } from './components/mixer.jsx';
import { MasterBus } from './components/masterBus.jsx';


// Styles
import '../styles/index.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { commands: [] };

  }




  render() {

    const masterBusProps = {
      command: (command, attrs) => {
        console.log("Master Bus Command: ", command, attrs);
      }
    }

    const mixerProps = {
      command: (command, attrs) => {
        console.log("Mixer Command: ", command, attrs);
      }
    }

    return (

      <div className="root-container">
        <header>

        </header>
        <div className="mixing-desk">
          <Mixer {...mixerProps}></Mixer>
          <MasterBus {...masterBusProps}></MasterBus>
        </div>


      </div>
    )
  }
}
