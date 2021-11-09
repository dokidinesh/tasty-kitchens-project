import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import './index.css'

class CartItem extends Component {
  state = {
    itemQuantity: 0,
  }

  onIncrement = () => {
    const {cartItemDetails} = this.props
    const {id} = cartItemDetails
    this.setState(prevState => ({itemQuantity: prevState.itemQuantity + 1}))
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const foodObject = cartList.find(eachCartItem => eachCartItem.id === id)

    if (foodObject) {
      const updatedCartList = cartList.map(eachCartItem => {
        if (eachCartItem.id === foodObject.id) {
          const updateQuantity = eachCartItem.itemQuantity + 1
          return {...eachCartItem, itemQuantity: updateQuantity}
        }
        return eachCartItem
      })
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }
  }

  onDecrement = () => {
    const {itemQuantity} = this.state

    if (itemQuantity > 1) {
      this.setState({
        itemQuantity: itemQuantity - 1,
      })
    }
  }

  render() {
    const {cartItemDetails} = this.props

    const {imageUrl, name, cost, quantity} = cartItemDetails
    const itemQuantity = quantity
    return (
      <div className="desktop-cart-item-container" testid="cartItem">
        <div className="image-name-container">
          <img className="cart-food-image" src={imageUrl} alt="cart item" />
          <h1 className="food-name">{name}</h1>
        </div>
        <div className="counter-container">
          <button
            type="button"
            onClick={this.onDecrement}
            testid="decrement-quantity"
          >
            -
          </button>
          <p className="item-quantity" testid="item-quantity">
            {itemQuantity}
          </p>
          <button
            type="button"
            onClick={this.onIncrement}
            testid="increment-quantity"
          >
            +
          </button>
        </div>
        <div className="food-cost">
          <BiRupee />
          <p>{cost * quantity}.00</p>
        </div>
      </div>
    )
  }
}

export default CartItem
