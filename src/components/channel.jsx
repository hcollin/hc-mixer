import React from 'react';
import 'howler';

import { PlayButton } from '../common/playButton.jsx';
import { StopButton } from '../common/stopButton.jsx';
import { MuteButton } from '../common/muteButton.jsx';
import { LoopButton } from '../common/loopButton.jsx';
import { Slider } from '../common/slider.jsx';
import { Timer } from '../common/timer.jsx';

export class Channel extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      playing: false,
      ready: true,
      status: "EMPTY",
      volume: 0.8,
      muted: false,
      loop: false,
      name: this.props.name,
      filename: "",
      durationText: "",
      muteIcon: ""

    };

    this.handleOpenFile = this.handleOpenFile.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {

    if(!this.state.ready) {
      return;
    }

    if(this.props.sound && this.state.status == "EMPTY") {
      this.loadSound(this.props.sound);
    }

  }

  loadSound(filename) {
    this.setState(prevState => ({
      status: "LOADING",
      ready: false
    }), () => {
      this.howler = new Howl({
        src: [filename],
        volume: this.state.volume,
        onload: () => {

          const fullDurationInSec = Math.round(this.howler.duration());
          const durationFullMins = Math.floor(fullDurationInSec/60);
          const durationRestSec = fullDurationInSec - (durationFullMins * 60);

          this.setState(prevState => ({
            playing: false,
            ready: true,
            status: "STOP",
            durationText: (durationFullMins < 10 ? "0"+durationFullMins : durationFullMins) + ":" + (durationRestSec < 10 ? "0"+ durationRestSec: durationRestSec)
          }));
        },
        onend: () => {
          if(!this.state.looped) {
            this.setState(prevState => ({
              playing: false,
              ready: true,
              status: "STOP"
            }));
          }
        }
      });
    });

  }

  handleOpenFile(e) {
    const  file = document.getElementById("open-local-file-input").files[0];
    this.setState({
      status: "LOADING",
      ready: false,
      filename: file['name']
    }, () => {
      let r = new FileReader();
      r.addEventListener("load", () => {
        this.loadSound(r.result)
      }, false)
      r.readAsDataURL(file);
    });
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
    this.howler.mute(this.state.muted);
  }

  switchLooped() {
    this.howler.loop(this.state.looped);
  }

  changeVolume() {
    this.howler.volume(this.state.volume);
  }

  render() {

    // Loading screen
    if(this.state.status == "LOADING") {
      return (
          <div className="channel loading">
            <img src="./imgs/gears.svg" className="loading-gears"></img>
          </div>
      );
    }

    // Open File screen
    if(this.state.status == "EMPTY") {
      return (
          <div className="channel open-file">
            <input type="file" id="open-local-file-input" onChange={this.handleOpenFile}></input>
            <img src="./imgs/open-folder.svg" className="open-folder" onClick={this.handleOpenFile}></img>
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
        this.setState( prevState => {
          const muteState = !prevState.muted;
          return {
            muted: muteState
          };
        }, this.switchMute)
      }
    }

    const loopProps = {
      looped: this.state.looped,
      onClick: () => {
        console.log("Loop clicked!");
        this.setState( prevState => {
          const loopState = !prevState.looped;
          return {
            looped: loopState
          };
        }, this.switchLooped)
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

    const timerProps = {
      active: this.state.playing,
      interval: 1,
      onTick: () => {
        return this.howler.seek();
      }
    };

    return (
      <div className="channel">
        <div className="header">
          <h1>{this.state.name}</h1>
          <h2>{this.state.filename}</h2>
        </div>

        <div className="main-content">
          <div className="duration">
            <Timer {...timerProps}></Timer>
            <span className="full-duration">{this.state.durationText}</span>
            <span className="icons">
              {this.state.muted &&
                <img src="./imgs/speaker-off-white.svg"></img>
              }
              {this.state.looped &&
                <img src="./imgs/looping-white.svg"></img>
              }
            </span>
            <span className="status">{this.state.status}</span>
          </div>
          <div className="volume-slider-container">
            <Slider {...sliderProps}></Slider>
            <div className="buttons">
              <MuteButton {...muteProps}></MuteButton>
              <LoopButton {...loopProps}></LoopButton>
            </div>
          </div>
        </div>

        <div className="footer-buttons">
          <PlayButton {...playProps}></PlayButton>
          <StopButton {...stopProps}></StopButton>
        </div>

      </div>
    );
  }
}
