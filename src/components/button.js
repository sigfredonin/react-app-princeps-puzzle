import React, { Component } from 'react';
import buttonImage from '../images/button-red.png';

class Button extends Component {
  render() {
    return (
      <div 
        className="princeps-button" 
        onClick={() => this.props.onPress(this.props.ID)}
      >
        <img src={buttonImage} alt="red push button" height={48} />
      </div>
    )
  }
}

export default Button;
