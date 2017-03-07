import React from 'react';
import 'howler';

import { PlayButton } from '../common/playButton.jsx';

export class Channel extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <div className="channel">
        <h1>Channel X</h1>
        <h2>{this.props.sound}</h2>
        <PlayButton sound={this.props.sound}></PlayButton>

      </div>
    )
  }
}
