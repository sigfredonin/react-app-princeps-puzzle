import React, { Component } from 'react';
import LightsRow from './lightsRow';
import ButtonsRow from './buttonsRow';
import ButtonsResetRow from './buttonsResetRow';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      lights: Array(9).fill(false),
      q: Array(9).fill(false)
    }
  }

  handleButtonPress(buttonIndex) {
    const q = this.state.q.slice();
    const jk = [
      true,
      !q[0],
      q[0] && !q[1],
      q[0] &&  q[1] && !q[2],
      q[0] &&  q[1] &&  q[2] && !q[3],
      q[0] &&  q[1] &&  q[2] &&  q[3] && !q[4],
      q[0] &&  q[1] &&  q[2] &&  q[3] &&  q[4] && !q[5],
      q[0] &&  q[1] &&  q[2] &&  q[3] &&  q[4] &&  q[5] && !q[6]
    ];
    if (jk[buttonIndex]) {
      q[buttonIndex] = !q[buttonIndex];
    }
    this.setState({q: q});
  }

  handleReset() {
    const q = Array(9).fill(false);
    this.setState({q: q});
  }

  getLights() {
    const lights = this.state.q.slice();
    for (let i=0; i<lights.length; i++) {
      lights[i] = !lights[i];
    }
    return lights;
  }

  render() {
    return (
      <div className="princeps-game">
        <LightsRow lights={this.getLights()} />
        <ButtonsRow onPress={(i) => this.handleButtonPress(i)} />
        <ButtonsResetRow onPress={() => this.handleReset()} />
      </div>
    )
  }
}

export default Game;
