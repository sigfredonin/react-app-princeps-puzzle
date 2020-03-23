import React, { Component } from 'react';
import ButtonReset from './buttonReset';
import TitleBox from './titleBox';

class ButtonsResetRow extends Component {
  render() {
    return (
      <div className="princeps-buttons-reset-row">
        <ButtonReset onPress={this.props.onPress} />
        <TitleBox />
      </div>
    )
  }
}

export default ButtonsResetRow;
