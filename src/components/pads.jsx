import React from 'react';

import { AudioButton } from '../common/audioButton.jsx';
import { Pad } from '../common/pad.jsx';

import { CommandService } from '../services/commandService.js';

export class Pads extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active: false };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.handleKeyDownEvent = this.handleKeyDownEvent.bind(this);
    this.handleKeyUpEvent = this.handleKeyUpEvent.bind(this);

    this.cs = new CommandService();
  }

  handleKeyDownEvent(e) {
    this.cs.trigger("PAD_KEY_DOWN", e.code);
  }

  handleKeyUpEvent(e) {
    this.cs.trigger("PAD_KEY_UP", e.code);
  }

  handleMouseEnter(e) {
    window.addEventListener("keydown", this.handleKeyDownEvent);
    window.addEventListener("keyup", this.handleKeyUpEvent);
    this.setState({
      active: true
    });
  }

  handleMouseLeave(e) {
    window.removeEventListener("keydown", this.handleKeyDownEvent);
    window.removeEventListener("keyup", this.handleKeyUpEvent);
    this.setState({
      active: false
    });
  }

  render() {



    return (
      <div className={this.state.active ? "pads active" : "pads"} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <header>
          Pad player <small>(hover mouse)</small>
        </header>
        <Pad label="7" keycode="Numpad7"></Pad>
        <Pad label="8" keycode="Numpad8"></Pad>
        <Pad label="9" keycode="Numpad9"></Pad>
        <Pad label="4" keycode="Numpad4"></Pad>
        <Pad label="5" keycode="Numpad5"></Pad>
        <Pad label="6" keycode="Numpad6"></Pad>
        <Pad label="1" keycode="Numpad1"></Pad>
        <Pad label="2" keycode="Numpad2"></Pad>
        <Pad label="3" keycode="Numpad3"></Pad>
        <footer></footer>
      </div>
    )
  }
}
