import React from 'react';

export class CountButton extends React.Component {
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

    const txtCount = this.props.counter != false ? this.props.counter : "-";

    const classes = "audio-button counter " + (this.props.isactive ? "active " : "") + this.props.classes + (this.props.active ? " " : " deactive");
    return (
      <button className={classes} onClick={this.handleClick}>{txtCount}</button>
    )
  }
}
