import React from 'react';
import 'howler';

import { PlayButton } from '../common/playButton.jsx';

export class Channel extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <div class="channel">
        <PlayButton sound={this.props.sound}></PlayButton>

      </div>
    )
  }
}
