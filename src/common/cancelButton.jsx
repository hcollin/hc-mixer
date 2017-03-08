import React from 'react';

export class CancelButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.value};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick();
  }

  render() {
    return (
      <button className="cancel-button" onClick={this.handleClick}></button>
    )
  }
}
