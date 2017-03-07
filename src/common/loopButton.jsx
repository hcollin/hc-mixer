import React from 'react';

export class LoopButton extends React.Component {
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
      <button className={this.props.looped ? "audio-button looping active" : "audio-button looping"} onClick={this.handleClick}></button>
    )
  }
}
