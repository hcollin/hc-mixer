import React from 'react';

import { CommandService } from '../services/commandService.js';

export class Pad extends React.Component {
  constructor(props) {
    super(props);

    this.state = { targetChannel: false, active: false };

    this.handlePadTap = this.handlePadTap.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.keyDownObserver = false;
    this.keyUpObserver = false;

  }

  componentWillMount() {
    let cs = new CommandService();
    this.keyDownObserver = cs.on("PAD_KEY_DOWN", (keyCode) => {
      if(keyCode == this.props.keycode && !this.state.active) {
        this.setActive();
      }
    });
    this.keyUpObserver = cs.on("PAD_KEY_UP", (keyCode) => {
      if(keyCode == this.props.keycode && this.state.active) {
        this.setDeactive();
      }
    });
  }

  componentWillUnmount() {
    this.keyDownObserver();
    this.keyUpObserver();
  }

  setActive() {
      this.setState({
        active: true
      });
      let cs = new CommandService();
      cs.trigger("PLAY_CHANNEL", this.props.label);

  }

  setDeactive() {
    this.setState({
      active: false
    });
    let cs = new CommandService();
    cs.trigger("STOP_CHANNEL", this.props.label);
  }


  handlePadTap() {
    // this.setState({
    //   active: true
    // }, () => {
    //   setTimeout(() => {
    //     this.setState({
    //       active: false
    //     });
    //   }, 75);
    // });
  }

  handleMouseDown() {
    this.setActive();
  }

  handleMouseUp() {
    this.setDeactive();
  }

  render() {

    return (
      <div className={this.state.active ? "pad active": "pad"} onClick={this.handlePadTap} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
        <label>{this.props.label}</label>
      </div>
    )
  }
}
