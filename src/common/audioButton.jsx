import React from 'react';

export class AudioButton extends React.Component {
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
    const classes = "audio-button " + (this.props.isactive ? "active " : "") + this.props.classes + (this.props.active ? " " : " deactive");
    const content = this.props.content !== undefined ? this.props.content : "";
    return (
      <button className={classes} onClick={this.handleClick}>{content}</button>
    )
  }
}
