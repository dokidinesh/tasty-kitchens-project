import './index.css'
import {Component} from 'react'

class FoodItem extends Component {
  state = {
    isClickedAdd: false,
    quantity: 1,
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecrement = () => {
    const {quantity} = this.state

    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onClickAdd = () => {
    const {foodDetails} = this.props
    const {quantity} = this.state
    const updatedFoodDetails = {...foodDetails, quantity}
    const cartList = [updatedFoodDetails]
    localStorage.setItem('cartData', JSON.stringify(cartList))
    this.setState(prevState => ({isClickedAdd: !prevState.isClickAdd}))
  }

  render() {
    const {foodDetails} = this.props
    const {isClickedAdd, quantity} = this.state
    const isShowAddButton = quantity === 0 || isClickedAdd === false
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
              <p testid="active-count">{quantity}</p>
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
