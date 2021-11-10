import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import './index.css'

class CartItem extends Component {
  getItemQuantity = id => {
    const itemQuantity = JSON.parse(localStorage.getItem(`quantity ${id}`))
    return itemQuantity
  }

  onIncrement = () => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const {cartItemDetails} = this.props
    const {id} = cartItemDetails

    const cartObject = cartList.find(eachCartItem => eachCartItem.id === id)

    if (cartObject) {
      const quantity = JSON.parse(localStorage.getItem(`quantity${id}`))
      const updatedQuantity = quantity + 1
      localStorage.setItem(`quantity${id}`, JSON.stringify(updatedQuantity))
      const updatedCartList = cartList.map(eachCartItem => {
        if (cartObject.id === eachCartItem.id) {
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      })
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }
  }

  onDecrement = () => {
    const {cartItemDetails} = this.props
    const {id} = cartItemDetails
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const itemQuantity = JSON.parse(localStorage.getItem(`quantity${id}`))

    const cartObject = cartList.find(eachCartItem => eachCartItem.id === id)

    if (itemQuantity > 1) {
      if (cartObject) {
        const updatedQuantity = itemQuantity - 1
        localStorage.setItem(`quantity${id}`, JSON.stringify(updatedQuantity))
        const updatedCartList = cartList.map(eachCartItem => {
          if (cartObject.id === eachCartItem.id) {
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        })
        localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      }
    } else {
      localStorage.setItem(`isClickedAdd ${id}`, 'false')
      const updatedCartList = cartList.filter(
        eachCartItem => eachCartItem.id !== id,
      )
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }
  }

  render() {
    const {cartItemDetails} = this.props
    const {imageUrl, name, cost, quantity, id} = cartItemDetails
    const itemQuantity = this.getItemQuantity(id)
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
