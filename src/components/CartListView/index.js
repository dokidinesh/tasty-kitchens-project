import {Component} from 'react'
import {Link} from 'react-router-dom'
import CartSummary from '../cartSummary'
import CartItem from '../CartItem'

import './index.css'

class CartListView extends Component {
  state = {
    isPlaceOrderClicked: false,
  }

  onClickPlaceOrder = () => {
    this.setState(prevState => ({
      isPlaceOrderClicked: !prevState.isPlaceOrderClicked,
    }))
  }

  render() {
    const stringifiedCartList = localStorage.getItem('cartData')
    const cartList = JSON.parse(stringifiedCartList)
    const {isPlaceOrderClicked} = this.state

    return (
      <div className="cart-place-order-container">
        {isPlaceOrderClicked ? (
          <div className="payment-successfulView">
            <img
              src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635609929/Vectorpayment_success_wxiwik.png"
              alt="payment success"
            />
            <h1>Payment Successful</h1>
            <p>
              Thank you for ordering Your payment is successfully completed.
            </p>
            <Link to="/">
              <button type="button">Go To Home Page</button>
            </Link>
          </div>
        ) : (
          <div className="cart-list-container">
            <ul className="cart-list">
              <li className="cart-item-header">
                <p className="table-header-cell">Item</p>
                <p className="table-header-cell">Quantity</p>
                <p className="table-header-cell">Price</p>
              </li>
              {cartList.map(eachCartItem => (
                <CartItem
                  cartItemDetails={eachCartItem}
                  key={eachCartItem.id}
                />
              ))}
            </ul>
            <CartSummary onClickPlaceOrder={this.onClickPlaceOrder} />
          </div>
        )}
      </div>
    )
  }
}

export default CartListView
