import React from 'react';

export class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active, value: this.props.value, mouseDown: false, mouseStartPoint: false, mouseStartValue: false};

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

  }

  handleMouseDown(e) {
    e.preventDefault();
    const startPoint = e.nativeEvent.y;
    const startVolume = this.state.value;
    this.setState(prevState => ({
      mouseDown: true,
      mouseStartPoint: startPoint,
      mouseStartValue: startVolume
    }));


  }

  handleMouseUp(e) {
    e.preventDefault();
    this.setState(prevState => ({
      mouseDown: false,
      mouseStartPoint: false,
      mouseStartValue: false
    }));
  }

  handleMouseMove(e) {
    if(!this.state.mouseDown) {
      return;
    }
    e.preventDefault();
    const diff = e.nativeEvent.y - this.state.mouseStartPoint;
    const diffPerc =  Math.round((diff / 300)*100);

    if(diffPerc != 0) {
      let newVal = this.state.mouseStartValue - (diffPerc/100);
      newVal = (Math.round(newVal*100))/100;
      if(newVal > 1) {
        newVal = 1;
      }
      if(newVal < 0) {
        newVal = 0;
      }

      this.setState(prevState => ({
        value: newVal
      }));

      this.props.onChange(newVal);
    }

  }


  render() {

    const volume = Math.round(this.state.value * 100);
    const topPx = ((1 - this.state.value) * 300) - 32;

    return (
      <div className="slider">
        <div className="slider-button" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove} style={{top: topPx}}>
          {volume}%<br />
        </div>
      </div>
    )
  }
}
