import React from 'react';

import { AudioButton } from '../common/audioButton.jsx';
import { MuteButton } from '../common/muteButton.jsx';
import { CountButton } from '../common/countButton.jsx';

import { TrackNote } from '../common/trackNote.jsx';

import { CommandService } from '../services/commandService.js';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    console.log("TrackData: ", this.props.trackData);
    this.state = {
      key: this.props.trackData.key,
      channelLink: this.props.trackData.channelLink,
      muted: this.props.trackData.muted,
      notes: this.props.trackData.notes,
      maxNotes: this.props.maxNotes
    }

    this.handleNoteStatusChange = this.handleNoteStatusChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.maxNotes != nextProps.maxNotes && this.state.notes.length != nextProps.trackData.notes.length) {
      this.setState({
        notes: nextProps.trackData.notes,
        maxNotes: nextProps.maxNotes
      }, () => {
        this.forceUpdate();
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
  }

  sendUpdateUp() {
    this.props.onChange(this.state);
  }

  handleNoteStatusChange(position, status) {
    this.setState(prevState => {
      let newNotes = prevState.notes;
      newNotes[position] = status;

      return {
        notes: newNotes
      };
    }, () => {
      this.sendUpdateUp();
    });
  }

  render() {

    const muteProps = {
      active: true,
      muted: this.state.muted,
      onClick: () => {
        this.setState(prevState => ({
          muted: !prevState.muted
        }), () => {
          this.sendUpdateUp();
        });
      }
    }

    const channelLinkProps = {
      active: true,
      counter: this.state.channelLink,
      onClick: () => {
        this.setState(prevState => {
          let newVal = prevState.channelLink;

          if(newVal == false) {
            newVal = 0;
          }
          newVal++;
          if (newVal > 12) {
            newVal = false;
          }

          return {
            channelLink: newVal
          };
        }, () => {
          this.sendUpdateUp();
        });
      }
    }

    return (
      <div className="track">
        <header>
          <CountButton {...channelLinkProps}></CountButton>
          <MuteButton {...muteProps}></MuteButton>
        </header>
        <div className="notes">

          {
            this.state.notes.map((item, index) => {
              const isLarge = ((index % 4 ) == 0);
              return (
                <TrackNote classes={isLarge ? "large" : ""} status={item} key={index} position={index} onClick={this.handleNoteStatusChange}></TrackNote>
              )
            })
          }

        </div>
      </div>
    )
  }
}
