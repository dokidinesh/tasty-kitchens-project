import CartItem from '../CartItem'

import './index.css'

const CartListView = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const cartList = JSON.parse(stringifiedCartList)

  return (
    <div className="cart-list-container">
      <ul>
        <CartItem cartItemDetails={cartList} />
      </ul>
      <div className="order-total-container">
        <div className="order-price-container">
          <h1>Order Total:</h1>
          <p testid="total-price">total price</p>
        </div>

        <button className="place-order-button" type="button">
          Place Order
        </button>
      </div>
    </div>
  )
}

export default CartListView
