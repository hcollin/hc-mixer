import React from 'react';
import 'howler';

export class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false, ready: false };

    this.howler = new Howl({
      src: [this.props.sound],
      onload: () => {
        this.setState(prevState => ({
          active: false,
          ready: true
        }));
      }
    });

    this.handleClick = this.handleClick.bind(this);
    console.log(this.state);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Play " + this.props.sound + "? ", this.state.ready, this.state.active);
    if(!this.state.ready) {
      return;
    }

    if(this.state.active) {
      this.howler.play();
    }

    if(!this.state.active) {
      this.howler.stop();
    }
  }
  handleClick(e) {
    if(!this.state.ready) {
      return;
    }
    this.setState(prevState => ({
      active: !prevState.active
    }));



  }
  playStopEvent(e) {

  }
  render() {
    return (
      <button className={this.state.active ? "audio-button stop" : "audio-button play"} onClick={this.handleClick}></button>
    )
  }
}
