import React, { Component } from 'react';
import buttonHintImage from '../images/button-hint.png';

class ButtonHint extends Component {
  render() {
    return (
      <div
        className="princeps-button princeps-button-hint"
        onClick={() => this.props.onPress()}
      >
        <img src={buttonHintImage} alt="hint push button" height={48} />
      </div>
    )
  }
}

export default ButtonHint;
