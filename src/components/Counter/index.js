import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {
    activeCount: 1,
  }

  onIncrement = () => {
    this.setState(prevState => ({activeCount: prevState.activeCount + 1}))
  }

  onDecrement = () => {
    const {activeCount} = this.state
    if (activeCount > 1) {
      this.setState(prevState => ({activeCount: prevState.activeCount - 1}))
    }
  }

  render() {
    const {activeCount} = this.state
    return (
      <div className="counter-container">
        <button
          type="button"
          onClick={this.onDecrement}
          testid="decrement-count"
        >
          -
        </button>
        <p testid="active-count">{activeCount}</p>
        <button
          type="button"
          onClick={this.onIncrement}
          testid="increment-count"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
