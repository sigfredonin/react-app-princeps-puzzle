import React, { Component } from 'react';
import Title from './title';
import Instructions from './instructions';
import Hint1 from './hint_1';
import Hint2 from './hint_2';
import ButtonHint from './buttonHint';

class TitleBox extends Component {
  constructor(props){
    super(props);
    this.hints = [
      <Instructions />,
      <Hint1 />,
      <Hint2 />
    ];
    this.state = {
      helpIndex: 0
    }
  }

  helpText() {
    return (
      <div className="princeps-help-box">
        {this.hints[this.state.helpIndex]}
        <ButtonHint onPress={() => this.handleHintClick()} />
      </div>
    );
  }

  handleHintClick() {
    const helpIndex = (this.state.helpIndex + 1) % this.hints.length;
    this.setState(
      { helpIndex: helpIndex }
    )
  }

  render() {
    return (
      <div className="princeps-title-box">
          <Title />
          {this.helpText()}
      </div>
    )
  }
}

export default TitleBox;
