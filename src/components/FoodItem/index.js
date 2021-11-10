import './index.css'
import {Component} from 'react'

class FoodItem extends Component {
  state = {
    isClickedAdd: false,
    activeCount: 1,
  }

  onIncrement = () => {
    this.setState(prevState => ({
      activeCount: prevState.activeCount + 1,
    }))
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const {foodDetails} = this.props
    const {id} = foodDetails
    const foodObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (foodObject) {
      const quantity = JSON.parse(localStorage.getItem(`quantity${id}`))
      const updatedQuantity = quantity + 1
      localStorage.setItem(`quantity${id}`, JSON.stringify(updatedQuantity))
      const updatedCartList = cartList.map(eachCartItem => {
        if (foodObject.id === eachCartItem.id) {
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      })
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }
  }

  onDecrement = () => {
    const {foodDetails} = this.props
    const {id} = foodDetails
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const foodObject = cartList.find(eachCartItem => eachCartItem.id === id)
    const quantity = JSON.parse(localStorage.getItem(`quantity${id}`))

    if (quantity > 1) {
      this.setState(prevState => ({activeCount: prevState.activeCount - 1}))
      if (foodObject) {
        const updatedQuantity = quantity - 1
        localStorage.setItem(`quantity${id}`, JSON.stringify(updatedQuantity))
        const updatedCartList = cartList.map(eachCartItem => {
          if (foodObject.id === eachCartItem.id) {
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        })
        localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      }
    } else {
      this.setState(prevState => ({isClickedAdd: !prevState.isClickedAdd}))
      localStorage.setItem(`isClickedAdd ${id}`, 'false')
      const updatedCartList = cartList.filter(
        eachCartItem => eachCartItem.id !== id,
      )
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }
  }

  onClickAdd = () => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const {foodDetails} = this.props
    const {id} = foodDetails
    this.setState(prevState => ({
      isClickedAdd: !prevState.isClickedAdd,
      quantity: prevState.quantity + 1,
    }))
    const updatedFoodDetails = {...foodDetails, quantity: 1}

    if (cartList === null) {
      const updatedCartList = [updatedFoodDetails]
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      localStorage.setItem(`isClickAdd ${id}`, 'true')
      localStorage.setItem(`quantity${id}`, '1')
    } else {
      const updatedCartList = [...cartList, updatedFoodDetails]
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      localStorage.setItem(`isClickAdd ${id}`, 'true')
      localStorage.setItem(`quantity${id}`, '1')
    }
  }

  render() {
    const {foodDetails} = this.props
    const {imageUrl, name, cost, rating, id} = foodDetails
    const {activeCount} = this.state
    const quantity = JSON.parse(localStorage.getItem(`quantity${id}`))
    const isClickedAdd = localStorage.getItem(`isClickAdd ${id}`)
    return (
      <li className="food-item" testid="foodItem">
        <img className="food-item-image" src={imageUrl} alt="food item" />
        <div className="food-item-details">
          <h1 className="food-item-name">{name}</h1>
          <p className="food-item-cost">{cost}.00</p>
          <p className="food-item-rating">{rating}</p>
          {isClickedAdd ? (
            <div className="counter-container">
              <button type="button" onClick={this.onDecrement}>
                -
              </button>
              <p>{quantity}</p>
              <button type="button" onClick={this.onIncrement}>
                +
              </button>
            </div>
          ) : (
            <button
              className="add-button"
              type="button"
              onClick={this.onClickAdd}
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
