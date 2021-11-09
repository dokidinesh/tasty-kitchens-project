import './index.css'
import {BiRupee} from 'react-icons/bi'

const CartSummary = props => {
  const cartList = JSON.parse(localStorage.getItem('cartData'))
  const {onClickPlaceOrder} = props
  console.log(cartList)

  const onClickPlaceOrderButton = () => {
    onClickPlaceOrder()
  }

  let total = 0

  cartList.forEach(eachCartItem => {
    total += eachCartItem.quantity * eachCartItem.cost
  })

  return (
    <div className="order-total-container">
      <div className="order-price-container">
        <h1 className="order-total-heading">Order Total:</h1>
        <div className="total-cost-container">
          <BiRupee />
          <p testid="total-price">{total}.00</p>
        </div>
      </div>

      <button
        className="place-order-button"
        type="button"
        onClick={onClickPlaceOrderButton}
      >
        Place Order
      </button>
    </div>
  )
}

export default CartSummary
