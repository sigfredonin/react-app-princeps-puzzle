import React, { Component } from 'react';
import lightImageON from '../images/light-red-on.png';
import lightImageOFF from '../images/light-red-off.png';

class Light extends Component {
  render() {
    if (this.props.ON) {
      return (
        <div className="princeps-light">
          <img src={lightImageON} alt="light ON" height={48} />
        </div>
      )
    } else {
      return (
        <div className="princeps-light">
          <img src={lightImageOFF} alt="light OFF" height={48} />
        </div>
      )
    }
  }
}

export default Light;
