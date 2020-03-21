import React, { Component } from 'react';
import Light from './light';

class LightsRow extends Component {
  render() {
    return (
      <div className="princeps-lights-row">
        <Light ON={this.props.lights[0]} />
        <Light ON={this.props.lights[1]} />
        <Light ON={this.props.lights[2]} />
        <Light ON={this.props.lights[3]} />
        <Light ON={this.props.lights[4]} />
        <Light ON={this.props.lights[5]} />
        <Light ON={this.props.lights[6]} />
        <Light ON={this.props.lights[7]} />
      </div>
    )
  }
}

export default LightsRow;
