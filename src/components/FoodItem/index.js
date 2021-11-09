import './index.css'
import {Component} from 'react'

let updatedCartList

class FoodItem extends Component {
  state = {
    isClickedAdd: false,
    quantity: 0,
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const {foodDetails} = this.props
    const {id} = foodDetails
    const foodObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (foodObject) {
      updatedCartList = cartList.map(eachCartItem => {
        if (eachCartItem.id === foodObject.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      })
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }
  }

  onDecrement = () => {
    const {quantity} = this.state
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const {foodDetails} = this.props
    const {id} = foodDetails
    const foodObject = cartList.find(eachCartItem => eachCartItem.id === id)

    if (foodObject.quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))

      if (foodObject) {
        updatedCartList = cartList.map(eachCartItem => {
          if (eachCartItem.id === foodObject.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        })
      } else if (foodObject.quantity === 1) {
        updatedCartList = cartList.filter(
          eachCartItem => eachCartItem.id !== id,
        )
        localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      }
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    } else if (quantity === 1) {
      this.setState(prevState => ({
        isClickedAdd: !prevState.isClickedAdd,
      }))
    }
  }

  onClickAdd = () => {
    const {foodDetails} = this.props
    const {id} = foodDetails
    const cartList = JSON.parse(localStorage.getItem('cartData'))

    if (cartList === null) {
      const updatedFoodDetails = {...foodDetails, quantity: 1}
      updatedCartList = [updatedFoodDetails]
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    } else {
      const foodObject = cartList.find(eachCartItem => eachCartItem.id === id)

      if (!foodObject) {
        const updatedFoodDetails = {...foodDetails, quantity: 1}
        updatedCartList = [...cartList, updatedFoodDetails]
        localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      }
    }
    this.setState(prevState => ({
      isClickedAdd: !prevState.isClickAdd,
      quantity: 1,
    }))
  }

  render() {
    const {foodDetails} = this.props
    const {quantity} = this.state
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
          {quantity < 1 ? (
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
