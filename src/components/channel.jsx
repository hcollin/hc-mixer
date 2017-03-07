import React from 'react';
import 'howler';

import { PlayButton } from '../common/playButton.jsx';
import { StopButton } from '../common/stopButton.jsx';
import { MuteButton } from '../common/muteButton.jsx';
import { Slider } from '../common/slider.jsx';


export class Channel extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      playing: false,
      ready: false,
      status: "LOADING",
      volume: 0.8,
      muted: false
    };

    this.howler = new Howl({
      src: [this.props.sound],
      volume: this.state.volume,
      onload: () => {
        this.setState(prevState => ({
          playing: false,
          ready: true,
          status: "STOP"
        }));
      },
      onend: () => {
        this.setState(prevState => ({
          playing: false,
          ready: true,
          status: "STOP"
        }));
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {

    if(!this.state.ready) {
      return;
    }

  }

  play() {
    this.howler.play();
  }

  pause() {
    this.howler.pause();
  }

  stop() {
    this.howler.stop();
  }

  switchMute() {
    console.log("Mute sound!");
    this.howler.mute(this.state.muted);
  }

  changeVolume() {
    this.howler.volume(this.state.volume);
  }

  render() {

    if(!this.state.ready) {
      return (
          <div className="channel loading">
            <img src="./imgs/gears.svg" className="loading-gears"></img>
          </div>
      );
    }

    const stopProps = {
      active: this.state.playing,
      onClick: () => {
        this.setState( prevState => ({
          status: "STOP",
          playing: false
        }), this.stop);

      }
    };

    const muteProps = {
      muted: this.state.muted,
      onClick: () => {
        console.log("Mute clicked!");
        this.setState( prevState => ({
          muted: !prevState.muted
        }), this.switchMute)
      }
    }

    const playProps = {
      value: this.state.playing,
      status: this.state.status,
      onClick: () => {
        switch(this.state.status) {
          case "STOP":
          case "PAUSE":
            this.setState(prevState => ( {
              status: "PLAY",
              playing: true
            }), this.play);
            break;
          case "PLAY":
            this.setState(prevState => ( {
              status: "PAUSE",
              playing: true
            }), this.pause);
            break;
        }
      }
    };

    const sliderProps = {
      value: this.state.volume,
      active: this.state.ready,
      onChange: (newVal) => {
        this.setState(prevState => ({
          volume: newVal
        }), this.changeVolume);
      }
    };


    // console.log("Channel Render ", this.props.name, this.state , stopProps);

    return (
      <div className="channel">
        <div className="header">
          <h1>{this.props.name}</h1>
          <h2>{this.props.sound}</h2>
        </div>

        <div className="main-content">

          <div className="volume-slider-container">
            <Slider {...sliderProps}></Slider>
            <div className="buttons">
              <MuteButton {...muteProps}></MuteButton>
            </div>
          </div>


          {this.state.status}
        </div>

        <div className="footer-buttons">
          <PlayButton {...playProps}></PlayButton>
          <StopButton {...stopProps}></StopButton>
        </div>

      </div>
    );
  }
}
