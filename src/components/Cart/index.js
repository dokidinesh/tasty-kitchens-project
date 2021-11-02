import Navbar from '../Navbar'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'

import './index.css'

const Cart = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const cartList = JSON.parse(stringifiedCartList)
  const showEmptyCartView = cartList.length === 0

  return (
    <>
      <Navbar />
      <div>{showEmptyCartView ? <EmptyCartView /> : <CartListView />}</div>
    </>
  )
}

export default Cart
