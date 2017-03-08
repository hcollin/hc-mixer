import React from 'react';

import 'howler';

import { Channel } from './channel.jsx';
import { Slider } from '../common/slider.jsx';
import { Knob } from '../common/knob.jsx';
import { MuteButton } from '../common/muteButton.jsx';
import { AudioButton } from '../common/audioButton.jsx';

import { CommandService } from '../services/commandService.js';

export class MasterBus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 0.8,
      muted: false,
      pan: 0,
      masterCommand: false,
      commandService: new CommandService()
    };

  }

  changeVolume() {
    Howler.volume(this.state.volume);
  }

  switchMute() {
    Howler.mute(this.state.muted);
  }

  changePan() {
    Howler.stereo(this.state.pan);
  }


  render() {

    const sliderProps = {
      value: this.state.volume,
      active: true,
      onChange: (newVal) => {
        this.setState(prevState => ({
          volume: newVal
        }), this.changeVolume);
      }
    };

    const muteProps = {
      muted: this.state.muted,
      onClick: () => {
        this.setState( prevState => {
          const muteState = !prevState.muted;
          return {
            muted: muteState
          };
        }, this.switchMute)
      }
    };

    const panProps = {
      active: true,
      minValue: -100,
      maxValue: 100,
      step: 5,
      defaultValue: 0,
      label: "PAN",
      onChange: (newPan) => {
        this.setState({
          pan: newPan/100
        }, this.changePan);
      }
    };

    const playAllProps = {
      active: true,
      classes: "play",
      onClick: () => {
        console.log("Play All!");
        this.state.commandService.trigger("PLAY_ALL");

      }
    };

    const stopAllProps = {
      active: true,
      classes: "stop",
      onClick: () => {
        console.log("Stop All!");
        this.state.commandService.trigger("STOP_ALL");
      }
    }


    return (
      <div className="master-bus">
        <div className="channel">
          <div className="header">
            <h1>MASTER</h1>
          </div>

          <div className="main-content">
              <Slider {...sliderProps}></Slider>

              <Knob {...panProps}></Knob>
          </div>

          <div className="footer-buttons">
              <MuteButton {...muteProps}></MuteButton>
              <AudioButton {...playAllProps}></AudioButton>
              <AudioButton {...stopAllProps}></AudioButton>
          </div>

        </div>
      </div>
    )
  }
}
