import React, { Component } from 'react';
import Title from './title';
import Instructions from './instructions';

class TitleBox extends Component {
  render() {
    return (
      <div className="princeps-title-box">
          <Title />
          <Instructions />
      </div>
    )
  }
}

export default TitleBox;
