import React from 'react';

export class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.value, paused: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if(this.props.multiplay) {
      this.setState({
        paused: false
      });
    } else {
      this.setState(prevState => ({
        paused: !prevState.paused
      }));
    }
    this.props.onClick();
  }

  render() {
    const showPauseButton = this.props.status == "PLAY" && this.props.multiplay == false ? true : false;


    return (
      <button className={showPauseButton ? "audio-button pause" : "audio-button play"} onClick={this.handleClick}></button>
    )
  }
}
