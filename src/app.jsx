import React from 'react';

import { Channel } from './components/channel.jsx';


// Services
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
        <div class="mixer">
          <Channel sound="./sounds/yao.mp3"></Channel>
          <Channel sound="./sounds/rise.mp3"></Channel>
          <Channel sound="./sounds/house.mp3"></Channel>
        </div>

      </div>
    )
  }
}
