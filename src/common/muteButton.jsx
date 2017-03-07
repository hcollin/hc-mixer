import React from 'react';

export class MuteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.value};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick();
  }

  render() {
    return (
      <button className={this.props.muted ? "audio-button muted" : "audio-button not-muted"} onClick={this.handleClick}></button>
    )
  }
}
