import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import RestaurantItem from '../RestaurantItem'
import RestaurantsHeader from '../RestaurantsHeader'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class RestaurantsListView extends Component {
  state = {
    restaurantsList: [],
    isLoading: true,
    activeOptionId: sortByOptions[1].value,
    activePageNumber: 1,
    offset: 0,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    const accessToken = Cookies.get('jwt_token')
    const {activeOptionId, offset} = this.state
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${9}&sort_by_rating=${activeOptionId}`

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(eachRestaurant => ({
        id: eachRestaurant.id,
        cuisine: eachRestaurant.cuisine,
        name: eachRestaurant.name,
        imageUrl: eachRestaurant.image_url,
        userRating: {
          ratingColor: eachRestaurant.user_rating.rating_color,
          totalReviews: eachRestaurant.user_rating.total_reviews,
          rating: eachRestaurant.user_rating.rating,
        },
      }))
      this.setState({restaurantsList: updatedData, isLoading: false})
    }
  }

  changeSortBy = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurantsList)
  }

  onClickRightButton = () => {
    const {activePageNumber} = this.state

    if (activePageNumber < 4 && activePageNumber >= 0) {
      const updatedActivePageNumber = activePageNumber + 1
      const updatedOffset = (updatedActivePageNumber - 1) * 9
      this.setState(
        {activePageNumber: updatedActivePageNumber, offset: updatedOffset},
        this.getRestaurantsList,
      )
    }
  }

  onClickLeftButton = () => {
    const {activePageNumber} = this.state

    if (activePageNumber > 1) {
      const updatedActivePageNumber = activePageNumber - 1
      const updatedOffset = (updatedActivePageNumber - 1) * 9
      this.setState(
        {
          activePageNumber: updatedActivePageNumber,
          offset: updatedOffset,
        },
        this.getRestaurantsList,
      )
    }
  }

  renderLoadingView = () => (
    <div
      testid="restaurants-list-loader"
      className="restaurant-details-loader-container"
    >
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantsListView = () => {
    const {restaurantsList, activeOptionId, activePageNumber} = this.state

    return (
      <div>
        <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
        <RestaurantsHeader
          activeOptionId={activeOptionId}
          sortByOptions={sortByOptions}
          changeSortBy={this.changeSortBy}
        />
        <hr className="separator" />
        <ul className="restaurants-list">
          {restaurantsList.map(restaurant => (
            <RestaurantItem
              key={restaurant.id}
              restaurantDetails={restaurant}
            />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            testid="pagination-left-button"
            onClick={this.onClickLeftButton}
          >
            <img
              src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635768702/Icon_yk7ujy.png"
              alt="left page"
            />
          </button>
          <p>
            <span testid="active-page-number">{activePageNumber}</span> of 4
          </p>
          <button
            type="button"
            testid="pagination-right-button"
            onClick={this.onClickRightButton}
          >
            <img
              src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635768718/Chevron_Right_-_16px_bq6nvc.png"
              alt="right page"
            />
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading
          ? this.renderLoadingView()
          : this.renderRestaurantsListView()}
      </div>
    )
  }
}

export default RestaurantsListView
