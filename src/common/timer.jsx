import React from 'react';

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: this.props.active, interval: this.props.interval, value: 0};
  }

  componentDidMount() {
    this.state.ticker = setInterval(() => {
      this.setState({
        value: Math.floor(this.props.onTick())
      });
    }, this.state.interval*1000);
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.active;
  }

  render() {
    const fullDurationInSec = Math.round(this.state.value);
    const durationFullMins = Math.floor(fullDurationInSec/60);
    const durationRestSec = fullDurationInSec - (durationFullMins * 60);

    const tText = (durationFullMins < 10 ? "0"+durationFullMins : durationFullMins) + ":" + (durationRestSec < 10 ? "0"+ durationRestSec: durationRestSec);

    return (
      <span className="timer">{tText}</span>
    )
  }
}
