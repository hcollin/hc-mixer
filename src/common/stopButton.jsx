import React from 'react';

export class StopButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }



  handleClick(e) {
    if(this.props.active) {
        this.props.onClick();
    }
  }

  render() {
    return (
      <button className={this.props.active ? "audio-button stop" : "audio-button stop deactive"} onClick={this.handleClick}></button>
    )
  }
}
