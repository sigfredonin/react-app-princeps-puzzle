import React, { Component } from 'react';
import ButtonReset from './buttonReset';

class ButtonsResetRow extends Component {
  render() {
    return (
      <div className="princeps-buttons-reset-row">
        <ButtonReset onPress={this.props.onPress} />
      </div>
    )
  }
}

export default ButtonsResetRow;
