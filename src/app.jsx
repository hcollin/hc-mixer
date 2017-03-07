import React from 'react';

import { Channel } from './components/channel.jsx';


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
          <h1>Tracker</h1>
        </header>
        <div className="mixer">
          <Channel name="Yao People" sound="./sounds/yao.mp3"></Channel>
          <Channel name="Rise" sound="./sounds/rise.mp3"></Channel>
          <Channel name="House Techno" sound="./sounds/house.mp3"></Channel>
        </div>

      </div>
    )
  }
}
