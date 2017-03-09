import React from 'react';
import 'howler';

import { PlayButton } from '../common/playButton.jsx';
import { StopButton } from '../common/stopButton.jsx';
import { MuteButton } from '../common/muteButton.jsx';
import { LoopButton } from '../common/loopButton.jsx';
import { AudioButton } from '../common/audioButton.jsx';
import { CountButton } from '../common/countButton.jsx';
import { CancelButton } from '../common/cancelButton.jsx';
import { Slider } from '../common/slider.jsx';
import { Knob } from '../common/knob.jsx';
import { Timer } from '../common/timer.jsx';

import { CommandService } from '../services/commandService.js';

export class Channel extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      id: this.props.no,
      playing: false,
      ready: true,
      status: "EMPTY",
      volume: 0.8,
      pan: 0,
      speed: 1,
      muted: false,
      loop: false,
      name: this.props.name,
      filename: "",
      durationText: "",
      multiplay: false,
      muteIcon: "",
      padLink: false,
      commandService: new CommandService()
    };

    this.subscriptions = [];


    this.handleOpenFile = this.handleOpenFile.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {

    if(!this.state.ready) {
      return;
    }
  }

  componentWillUnmount() {
    for(let i = 0; i < this.subscriptions.length; i++) {
        this.subscriptions[i]();
    }
    if(this.howler) {
        this.howler.stop();
        this.howler.unload();
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

          // Trigger on play all
          this.subscriptions.push(this.state.commandService.on("PLAY_ALL", () => {
            this.play();
          }));

          this.subscriptions.push(this.state.commandService.on("STOP_ALL", () => {
            this.stop();
          }));

          this.subscriptions.push(this.state.commandService.on("PLAY_CHANNEL", (channelid) => {
              if(channelid == this.state.padLink) {
                this.play();
              }
          }));

          this.subscriptions.push(this.state.commandService.on("STOP_CHANNEL", (channelid) => {
              if(channelid == this.state.padLink) {
                console.log("STOP ME!", channelid);
                this.stop();
              }
          }));

          this.setState(prevState => ({
            playing: false,
            ready: true,
            status: "STOP",
            durationText: (durationFullMins < 10 ? "0"+durationFullMins : durationFullMins) + ":" + (durationRestSec < 10 ? "0"+ durationRestSec: durationRestSec)
          }));
        },
        onend: () => {
          console.log("STOP HOWLER AT THE END", this.howler.playing());
          if(!this.state.looped) {
            if(this.state.multiplay && this.howler.playing()) {

            } else {
              this.setState(prevState => ({
                playing: false,
                ready: true,
                status: "STOP"
              }));
            }
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

    if(this.state.multiplay == false && this.state.status == "PLAY") {
      this.stop();
      // return;
    }
    this.howler.play();
    this.setState(prevState => ( {
      status: "PLAY",
      playing: true
    }));

  }

  pause() {
    this.howler.pause();
    this.setState(prevState => ( {
      status: "PAUSE",
      playing: true
    }));
  }

  stop() {
    this.howler.stop();
    this.setState( prevState => ({
      status: "STOP",
      playing: false
    }));
  }

  seek(target) {
    this.howler.seek(target);
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

  changePan() {
    this.howler.stereo(this.state.pan);
  }

  changeSpeed() {
    this.howler.rate(this.state.speed);
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

    const cancelProps = {
      onClick: () => {

        this.props.remove(this.props.no);
      }
    };

    // Open File screen
    if(this.state.status == "EMPTY") {
      return (
          <div className="channel open-file">
            <h1>Open local file</h1>
            <input type="file" id="open-local-file-input" name="open-local-file-input" className="file-selector" onChange={this.handleOpenFile}></input>
            <label htmlFor="open-local-file-input"></label>

            <h1>Sound Library</h1>

            <CancelButton {...cancelProps}></CancelButton>
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
      multiplay: this.state.multiplay,
      onClick: () => {
        if(this.state.multiplay) {
          this.play();
        } else {
          switch(this.state.status) {
            case "STOP":
            case "PAUSE":
              this.play();
              break;
            case "PLAY":
              this.pause();
              break;
          }
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
    }

    const speedProps = {
      active: true,
      minValue: 50,
      maxValue: 400,
      step: 1,
      defaultValue: 100,
      label: "SPEED",
      onChange: (newSpeed) => {
        this.setState({
          speed: newSpeed/100
        }, this.changeSpeed);
      }
    };



    const forwardProps = {
      active: true,
      classes: "forward",
      onClick: () => {
        let  fow = this.howler.seek() + 5;
        if(fow > this.howler.duration()) {
          fow = this.howler.duration() - 1;
        }
        this.seek(fow);
      }
    }

    const rewindProps = {
      active: true,
      classes: "rewind",
      onClick: () => {
        let rew = this.howler.seek() - 5;
        if(rew < 0 ) {
          rew = 0;
        }
        this.seek(rew);
      }
    }

    const timeKnob = {
      active: this.state.playing,
      minValue: 0,
      maxValue: Math.floor(this.howler.duration()),
      step: 1,
      defaultValue: 0,
      passiveValue: 0,
      automated: true,
      onTick: () => {
        return this.howler.seek();
      },
      ticking: this.state.playing,
      label: "TIME",
      classes: "large",
      onChange: (newPosition) => {
        this.seek(newPosition);
      }
    }

    const multiplayProps = {
      active: true,
      classes: "multiplay",
      isactive: this.state.multiplay,
      onClick: () => {
        this.setState(prevState => ({
          multiplay: !prevState.multiplay
        }));
      }
    }

    const countPadProps = {
      active: true,
      counter: this.state.padLink,
      onClick: () => {
        this.setState(prevState => {
          let newVal = prevState.padLink;

          if(newVal == false) {
            newVal = 0;
          }
          newVal++;
          if (newVal > 9) {
            newVal = false;
          }

          return {
            padLink: newVal
          };
        });
      }
    }


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
              {this.state.multiplay &&
                <img src="./imgs/multiplay_white.svg"></img>
              }
            </span>
            <span className="status">{this.state.status}</span>
          </div>
          <div className="volume-slider-container">
            <Slider {...sliderProps}></Slider>
            <div className="buttons">
              <MuteButton {...muteProps}></MuteButton>
              <CountButton {...countPadProps}></CountButton>

              <Knob {...panProps}></Knob>
              <Knob {...speedProps}></Knob>
            </div>
          </div>
        </div>

        <div className="footer-buttons">
          <PlayButton {...playProps}></PlayButton>
          <StopButton {...stopProps}></StopButton>
          <LoopButton {...loopProps}></LoopButton>

          <AudioButton {...rewindProps}></AudioButton>
          <AudioButton {...forwardProps}></AudioButton>
          <AudioButton {...multiplayProps}></AudioButton>




          <Knob {...timeKnob}></Knob>

          <CancelButton {...cancelProps}></CancelButton>
        </div>

      </div>
    );
  }
}
