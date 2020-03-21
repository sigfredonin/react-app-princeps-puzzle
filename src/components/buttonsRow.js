import React, { Component } from 'react';
import Button from './button';

class ButtonsRow extends Component {
  render() {
    return (
      <div className="princeps-buttons-row">
        <Button ID={0} onPress={this.props.onPress} />
        <Button ID={1} onPress={this.props.onPress} />
        <Button ID={2} onPress={this.props.onPress} />
        <Button ID={3} onPress={this.props.onPress} />
        <Button ID={4} onPress={this.props.onPress} />
        <Button ID={5} onPress={this.props.onPress} />
        <Button ID={6} onPress={this.props.onPress} />
        <Button ID={7} onPress={this.props.onPress} />
      </div>
    )
  }
}

export default ButtonsRow;
