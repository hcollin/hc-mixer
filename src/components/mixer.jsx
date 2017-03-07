import React from 'react';

import { Channel } from './channel.jsx';

export class Mixer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      channelNo: 0,
      maxChannels: 12
    };

    this.handleNewChannel = this.handleNewChannel.bind(this);
  }

  handleNewChannel() {
    console.log("New Channel");


    this.setState(prevState => {
      const newChannel = {
        no: prevState.channelNo + 1,
        name: "Channel " + (prevState.channelNo + 1),
        sound: "./sounds/yao.mp3"
      };

      const newChannels = prevState.channels;
      newChannels.push(newChannel);

      return {
        channels: newChannels,
        channelNo: prevState.channelNo + 1

      }
    })

  }

  render() {

    const sounds = [
      {
        name: "Yao People",
        file: "./sounds/yao.mp3"
      },
      {
        name: "House Techno",
        file: "./sounds/house.mp3"
      }
    ];

    let addChannel = "";
    if(this.state.channels.length < this.state.maxChannels) {
      addChannel = (
        <div className="add-channel" onClick={this.handleNewChannel}>+<span className="counter">{this.state.channels.length} / {this.state.maxChannels}</span></div>
      )
    }


    return (
      <div className="mixer">
        <p>MIXER</p>
        {
          this.state.channels.map((item) => (
            <Channel name={item.name} sound={item.sound} key={item.no}></Channel>
          ))
        }
        {addChannel}
      </div>
    )
  }
}
