import React, { Component } from 'react';

class Hint1 extends Component {
  render() {
    return (
      <div className="princeps-help">
          <p>
              The leftmost light can change at any time,
              but any other light can only change state if
              the light immediately to its left is ON and
              all of the lights to the left of that are OFF.
          </p>
      </div>
    )
  }
}

export default Hint1;
