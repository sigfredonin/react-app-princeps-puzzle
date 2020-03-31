import React, { Component } from 'react';
import lights78 from '../images/lights_++++++OO.png';

class Hint2 extends Component {
  render() {
    return (
      <div className="princeps-help">
          <p>
              The right-most light, the eighth, can only change state if
              the light immediately to its left, the seventh is ON and
              all of the lights to the left of that, the first six lights, are OFF, like so:
          </p>
          <div className="princeps-help-image">
            <img src={lights78} alt="lights 1-6 OFF, 7-8 ON" height={30} />
          </div>
      </div>
    )
  }
}

export default Hint2;
