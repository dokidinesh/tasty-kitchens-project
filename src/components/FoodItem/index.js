import './index.css'
import {Component} from 'react'

class FoodItem extends Component {
  state = {
    isClickedAdd: false,
    activeCount: 0,
  }

  onIncrement = () => {
    this.setState(prevState => ({activeCount: prevState.activeCount + 1}))
  }

  onDecrement = () => {
    const {activeCount} = this.state
    if (activeCount > 0) {
      this.setState(prevState => ({activeCount: prevState.activeCount - 1}))
    }
  }

  onClickAdd = () => {
    const {foodDetails} = this.props
    const updatedFoodDetails = JSON.stringify(foodDetails)
    localStorage.setItem('cartData', updatedFoodDetails)
    this.setState(prevState => ({
      activeCount: 1,
      isClickedAdd: !prevState.isClickedAdd,
    }))
  }

  render() {
    const {foodDetails} = this.props
    const {isClickedAdd, activeCount} = this.state
    const isShowAddButton = activeCount === 0 || isClickedAdd === false
    const {imageUrl, name, cost, rating} = foodDetails
    return (
      <li className="food-item" testid="foodItem">
        <img className="food-item-image" src={imageUrl} alt="food item" />
        <div className="food-item-details">
          <h1 className="food-item-name">{name}</h1>
          <p className="food-item-cost">
            {cost}
            <span>.00</span>
          </p>
          <p className="food-item-rating">{rating}</p>
          {isShowAddButton ? (
            <button
              className="add-button"
              type="button"
              onClick={this.onClickAdd}
            >
              Add
            </button>
          ) : (
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
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
