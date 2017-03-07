import React from 'react';

import { Mixer } from './components/mixer.jsx';


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
        <Mixer></Mixer>

      </div>
    )
  }
}
