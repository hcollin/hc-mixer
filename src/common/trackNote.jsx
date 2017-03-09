import React from 'react';

import { CommandService } from '../services/commandService.js';

export class TrackNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: this.props.status,
      baseClasses: this.props.classes !== undefined ? this.props.classes : ""
    }

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.status != nextState.status;
  }

  handleOnClick() {
    this.setState(prevState => {

      let newStatus = prevState.status + 1;
      if(newStatus > 2) {
        newStatus = 0;
      }

      return {
        status: newStatus
      }
    }, () => {
      this.props.onClick(this.props.position, this.state.status);
    });
  }



  render() {
    console.log("Redraw note");
    let  classes = "track-note " + this.state.baseClasses;
    switch(this.state.status) {
      case 1:
        classes = classes + " play";
        break;
      case 2:
        classes = classes + " stop";
        break;
    }
    return (
        <div className={classes} onClick={this.handleOnClick}>{this.props.position}</div>
    )
  }
}
