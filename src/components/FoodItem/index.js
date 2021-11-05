import './index.css'
import {Component} from 'react'

class FoodItem extends Component {
  state = {
    isClickedAdd: false,
    quantity: 1,
  }

  onIncrement = () => {
    const {foodDetails} = this.props
    const {id} = foodDetails
    const cartList = JSON.parse(localStorage.getItem('cartData'))

    const updatedCartList = cartList.map(eachCartItem => {
      if (id === eachCartItem.id) {
        const updateQuantity = eachCartItem.quantity + 1
        return {...eachCartItem, quantity: updateQuantity}
      }
      return eachCartItem
    })

    localStorage.setItem('cartData', updatedCartList)
  }

  onDecrement = () => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const {foodDetails} = this.props
    const {id} = foodDetails

    const foodObject = cartList.find(eachCartItem => eachCartItem.id === id)

    if (foodObject.quantity > 1) {
      const updatedCartList = cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updateQuantity = eachCartItem.quantity - 1
          return {...eachCartItem, quantity: updateQuantity}
        }
        return eachCartItem
      })
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    } else {
      const updatedCartList = cartList.filter(
        eachCartItem => eachCartItem.id !== id,
      )

      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }
  }

  onClickAdd = () => {
    const {foodDetails} = this.props
    const {id} = foodDetails
    const {quantity} = this.state
    const newFoodDetails = {...foodDetails, quantity}
    const cartList = JSON.parse(localStorage.getItem('cartData'))

    const foodObject = cartList.find(eachCartItem => eachCartItem.id === id)

    if (foodObject) {
      const updatedCartList = cartList.map(eachCartItem => {
        if (foodObject.id === eachCartItem.id) {
          const updateQuantity = eachCartItem.quantity + newFoodDetails.quantity

          return {...eachCartItem, quantity: updateQuantity}
        }
        return eachCartItem
      })
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    } else {
      const updatedCartList = [...cartList, newFoodDetails]
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }

    this.setState(prevState => ({
      quantity: 1,
      isClickedAdd: !prevState.isClickedAdd,
    }))
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
