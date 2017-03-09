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
      angChange: angChange,
      mouseDown: false,
      mouseStartX: false,
      mousePrevX: false,
      ticker: false,
      ticking: this.props.ticking,
      passiveValue: this.props.defaultValue,
      classes:"knob-container " + (this.props.classes ? this.props.classes : "")
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleWheelEvent = this.handleWheelEvent.bind(this);

  }

  componentWillUnmount() {
    if(this.state.ticker) {
        clearInterval(this.state.ticker);
    }
  }

  componentDidUpdate() {

    if(this.props.active && this.props.automated && this.state.ticker == false) {

      this.state.ticker = setInterval(() => {
          if(!this.state.mouseDown) {
            this.setState({
              passiveValue: Math.floor(this.props.onTick())
            });
          }
      }, 1000);
    }

    if(!this.props.active && this.props.automated && this.state.ticker != false) {

      if(this.props.automated) {
        clearInterval(this.state.ticker);
        this.state.ticker = false;
        this.state.passiveValue = this.props.defaultValue;
        this.state.value = this.props.defaultValue;
        this.forceUpdate();
      }
    }
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
    const ne = e.nativeEvent;
    e.preventDefault();
    this.setState({
      mouseDown: true,
      mouseStartX: ne.x,
      mousePrevX: ne.x
    });

  }

  handleMouseUp(e) {
    e.preventDefault();
    this.setState(prevState => ({
      mouseDown: false,
      mouseStartX: false,
      mousePrevX: false,
      passiveValue: prevState.value
    }));
  }

  handleMouseMove(e) {
    const ne = e.nativeEvent;
    e.preventDefault();
    if(!this.state.mouseDown) {
      return;
    }

    if(ne.x > this.state.mousePrevX) {
      this.valueUp();
    }
    if(ne.x < this.state.mousePrevX) {
      this.valueDown();
    }
    this.setState({
      mousePrevX: ne.x
    }, () => {

    });


  }

  handleWheelEvent(e) {
    const we = e.nativeEvent;
    e.preventDefault();
    if(we.deltaY > 0) {
      this.valueUp();
    } else {
      this.valueDown();
    }
  }

  render() {
    let value = this.state.value;
    if(this.props.automated && !this.state.mouseDown) {
      value = this.state.passiveValue;
    }
    const currentPerc = (value - this.props.minValue) / (this.props.maxValue - this.props.minValue);
    const targetAngle = "rotate(" + ((270*currentPerc) - 135) + "deg)";

    return (
      <div className={this.state.classes}>
        <div className={this.state.mouseDown ? "mouse-move-plane active" : "mouse-move-plane"}  onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseUp} onMouseUp={this.handleMouseUp} ></div>
        <div className="knob" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onWheel={this.handleWheelEvent} style={{transform: targetAngle}}></div>
        <p className="min">{this.props.minValue}</p>
        <p className="max">{this.props.maxValue}</p>
        <span className="value">{value}</span>
        <label>{this.props.label}</label>
      </div>
    )
  }
}
