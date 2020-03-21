import React, { Component } from 'react';
import buttonResetImage from '../images/button-reset.svg';

class ButtonReset extends Component {
  render() {
    return (
      <div
        className="princeps-button princeps-button-reset"
        onClick={() => this.props.onPress()}
      >
      <img src={buttonResetImage} alt="reset push button" height={48} />
      </div>
    )
  }
}

export default ButtonReset;
