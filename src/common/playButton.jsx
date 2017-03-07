import React from 'react';

export class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.value, paused: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState(prevState => ({
      paused: !prevState.paused
    }));
    this.props.onClick();
  }

  render() {
    const showPauseButton = this.props.status == "PLAY" ? true : false;


    return (
      <button className={showPauseButton ? "audio-button pause" : "audio-button play"} onClick={this.handleClick}></button>
    )
  }
}
