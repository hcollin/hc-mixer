import React from 'react';
import 'howler';

import { PlayButton } from '../common/playButton.jsx';
import { StopButton } from '../common/stopButton.jsx';

export class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.state = { playing: false, ready: false, status: "LOADING" }

    this.howler = new Howl({
      src: [this.props.sound],
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

    if(this.state.status == "PLAY") {
      this.howler.play();
    }

    if(this.state.status == "PAUSE") {
      this.howler.pause();
    }

    if(this.state.status == "STOP") {
      this.howler.stop();
    }
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
        }));

      }
    };

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
            }));
            break;
          case "PLAY":
            this.setState(prevState => ( {
              status: "PAUSE",
              playing: true
            }));
            break;
        }
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
