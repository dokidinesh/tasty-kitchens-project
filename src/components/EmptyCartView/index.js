import {Link} from 'react-router-dom'
import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635609482/cooking_1empty_cart_view_va6ndo.png"
      alt="empty cart"
    />
    <h1 className="empty-cart-heading">No Order Yet!</h1>
    <p className="empty-cart-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button className="order-now-button" type="button">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
