import React from 'react';

export class Knob extends React.Component {
  constructor(props) {
    super(props);

    const absRange = Math.abs(this.props.minValue) + Math.abs(this.props.maxValue);
    const steps = absRange/this.props.step;
    const angChange = 270/steps;





    this.state = {
      active: this.props.active,
      value: this.props.defaultValue,
      absRange: absRange,
      steps: steps,
      angChange: angChange

    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleWheelEvent = this.handleWheelEvent.bind(this);

  }

  valueUp() {

    let newVal = Math.round(this.state.value + this.props.step);
    if(newVal > this.props.maxValue) {
      newVal = this.props.maxValue;
    }
    this.setState({
      value: newVal
    }, () => {
      this.props.onChange(newVal);
    });

  }

  valueDown() {

    let newVal = Math.round(this.state.value - this.props.step);
    if(newVal < this.props.minValue) {
      newVal = this.props.minValue;
    }
    this.setState({
      value: newVal
    }, () => {
      this.props.onChange(newVal);
    });
  }

  handleMouseDown(e) {
    console.log("Mouse Down!");
  }

  handleMouseUp(e) {
    console.log("Mouse Up!");
  }

  handleWheelEvent(e) {
    const we = e.nativeEvent;
    if(we.deltaY > 0) {
      this.valueUp();
    } else {
      this.valueDown();
    }
  }

  render() {
    const currentPerc = (this.state.value - this.props.minValue) / (this.props.maxValue - this.props.minValue);
    const targetAngle = "rotate(" + ((270*currentPerc) - 135) + "deg)";
    return (
      <div className="knob-container">
        <div className="knob" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onWheel={this.handleWheelEvent} style={{transform: targetAngle}}></div>
        <p className="min">{this.props.minValue}</p>
        <p className="max">{this.props.maxValue}</p>
        <span className="value">{this.state.value}</span>
        <label>{this.props.label}</label>
      </div>
    )
  }
}
