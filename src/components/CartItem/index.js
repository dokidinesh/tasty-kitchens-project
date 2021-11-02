import {Component} from 'react'
import './index.css'

class CartItem extends Component {
  state = {
    quantityCount: 1,
  }

  onIncrement = () => {
    this.setState(prevState => ({quantityCount: prevState.quantityCount + 1}))
  }

  onDecrement = () => {
    const {quantityCount} = this.state

    if (quantityCount > 1) {
      this.setState({quantityCount: quantityCount - 1})
    }
  }

  render() {
    const {cartItemDetails} = this.props
    const {quantityCount} = this.state
    const {imageUrl, name, cost} = cartItemDetails
    return (
      <div className="cart-item-container" testid="cartItem">
        <div className="image-name-container">
          <img className="cart-food-image" src={imageUrl} alt="cart item" />
          <h1>{name}</h1>
        </div>
        <div className="counter-container">
          <button
            type="button"
            onClick={this.onDecrement}
            testid="decrement-quantity"
          >
            -
          </button>
          <p testid="item-quantity">{quantityCount}</p>
          <button
            type="button"
            onClick={this.onIncrement}
            testid="increment-quantity"
          >
            +
          </button>
        </div>
        <p>{cost}</p>
      </div>
    )
  }
}

export default CartItem
