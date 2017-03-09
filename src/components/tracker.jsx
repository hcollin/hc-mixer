import React from 'react';

import { AudioButton } from '../common/audioButton.jsx';
import { Track } from './track.jsx';

import { CommandService } from '../services/commandService.js';

export class Tracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "STOP",
      bpm: 120,
      looping: false,
      tracks: [],
      trackNo: 0,
      position: 0,
      notes: 8,
      ticker: false,
      song: false,
      commandService: new CommandService()
    };

    this.ticker = false;

    this.tick = this.tick.bind(this);
    this.handleAddNewTrack = this.handleAddNewTrack.bind(this);
    this.handleTrackDataChange = this.handleTrackDataChange.bind(this);
  }

  playPosition() {
    const orders = this.state.song[this.state.position-1];

    if(orders.length > 0) {
        orders.forEach(order => {
          this.state.commandService.trigger(order.command, order.channelLink);
        });
    }
  }

  tick() {
    this.setState(prevState => ({
      position: prevState.position + 1
    }), () => {
      if(this.state.position > this.state.notes) {
        if(this.state.looping) {
          this.setState({
            position: 1
          }, () => {
              this.playPosition();
          });
        } else {
            this.stop();
        }
      } else {
        this.playPosition();
      }
    });
  }

  play() {

    this.setState({
      status: "PLAY",
      song: this.createPlayTrack()
    }, () => {
      const interval = Math.round(((60 / this.state.bpm) * 1000)/4);
      if(!this.state.ticker && this.state.song.length > 0) {
        this.setState({
          ticker: setInterval(this.tick, interval)
        });
      } else {
        this.stop();
      }
    });
  }

  stop() {
    this.setState({
      status: "STOP",
      position: 0,
      song: false
    }, () => {
      if(this.state.ticker !== false) {
        clearInterval(this.state.ticker);


        for(let i = 0; i <= this.state.tracks.length; i++) {
          console.log("STOP CHANNEL "+ i);
          this.state.commandService.trigger("STOP_CHANNEL", i);
        }

        this.setState({
          ticker: false
        });

      }
    });
  }

  pause() {

  }

  forward() {

  }

  rewind() {

  }

  gotoPosition(newPos) {

  }

  createPlayTrack() {
    let notesPerPosition = [];
    this.state.tracks.forEach((track, trackIndex) => {
      if(track.channelLink && !track.muted) {
        track.notes.forEach((note, position) => {
          if (notesPerPosition[position] === undefined) {
            notesPerPosition[position] = [];
          }
          if(note > 0) {

            const noteOrder = {
              channelLink: track.channelLink,
              pos: position,
              track: trackIndex,
              status: (note == 1) ? "PLAY" : "STOP",
              command: (note == 1) ? "PLAY_CHANNEL" : "STOP_CHANNEL"
            };
            let orders = [];
            orders = notesPerPosition[position];
            orders.push(noteOrder);
            notesPerPosition[position] = orders;
          }
        });

      }
    });
    return notesPerPosition;
  }

  changeNoteCountOnTracks() {
    this.setState(prevState => {
      const newTracks = prevState.tracks.map(track => {
        if(track.notes.length < prevState.notes) {
            const diff = prevState.notes - track.notes.length;
            const newNotes = Array(diff).fill(0);
            track.notes = track.notes.concat(newNotes);
        } else if (track.notes.length > prevState.notes) {
          const diff = prevState.notes - track.notes.length;
          track.notes.splice(diff);
        }
        return track;
      });

      console.log("NEW TRACKS", newTracks[0].notes.length);
      return {
        tracks: newTracks
      }
    });
  }

  handleAddNewTrack() {
    this.setState(prevState => {
      const nTrackNo = prevState.trackNo + 1;

      const notes = Array(this.state.notes).fill(0);

      const nTrack = {
        notes: notes,
        muted: false,
        channelLink: false,
        key: nTrackNo
      };

      let newTracks = prevState.tracks;
      newTracks.push(nTrack);

      return {
        trackNo: nTrackNo,
        tracks: newTracks
      }
    });
  }

  handleTrackDataChange(data) {
    this.setState(prevState => {
      let tracks = prevState.tracks;
      let track = tracks[data.key-1];
      track.muted = data.muted;
      track.notes = data.notes;
      track.channelLink = data.channelLink;
      tracks[data.key-1] = track;
      return {
        tracks: tracks
      }
    });
  }

  render() {

    const playButton = {
      classes: "play",
      active: true,
      onClick: () => {
        this.play();
      }
    }

    const stopButton = {
      classes: "stop",
      active: (this.state.status != "STOP"),
      onClick: () => {
        this.stop();
      }
    }

    const pauseButton = {
      classes: "pause",
      active: (this.state.status == "PLAY"),
      onClick: () => {

      }
    }

    const loopButton = {
      active: true,
      isactive: this.state.looping,
      classes: "looping",
      onClick: () => {
        this.setState(prevState => ({
          looping: !prevState.looping
        }))
      }
    }

    const increaseButtonProps = {
      active: (this.state.status == "STOP"),
      content: "+",
      classes: "text-large",
      onClick: () => {
        this.setState(prevState => {
          let notes = prevState.notes + 4;
          if(notes > 256) {
            notes = 256;
          }
          return {
            notes: notes
          }
        }, () => {
          this.changeNoteCountOnTracks();
        });
      }
    }

    const decreaseButtonProps = {
      active: (this.state.status == "STOP"),
      content: "-",
      classes: "text-large",
      onClick: () => {
        this.setState(prevState => {
          let notes = prevState.notes - 4;
          if(notes < 4) {
            notes = 4;
          }
          return {
            notes: notes
          }
        }, () => {
          this.changeNoteCountOnTracks();
        });
      }
    }

    return (
      <div className="tracker">
        <header>
          <h1>Tracker</h1>
        </header>
        <div className="tools">
          <section>
            <AudioButton {...pauseButton}></AudioButton>
            <AudioButton {...playButton}></AudioButton>
            <AudioButton {...stopButton}></AudioButton>
            <AudioButton {...loopButton}></AudioButton>

            <div className="count">{this.state.position}</div>
          </section>
          <section>
            <AudioButton {...increaseButtonProps}></AudioButton>
            <AudioButton {...decreaseButtonProps}></AudioButton>

            <div className="count">{this.state.notes}</div>
          </section>

        </div>
        <div className={this.state.status == "PLAY" ? "tracks playing" : "tracks"}>
          {
            this.state.tracks.map((item) => (
              <Track maxNotes={this.state.notes} trackData={item} key={item.key} onChange={this.handleTrackDataChange}></Track>
            ))
          }
          {this.state.tracks.length < 12 &&
            <div className="addTrack" onClick={this.handleAddNewTrack}>+ Add new track +</div>
          }
        </div>
        <footer>

        </footer>

      </div>
    )
  }
}
