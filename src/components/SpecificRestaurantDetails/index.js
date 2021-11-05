import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import FoodItem from '../FoodItem'
import Footer from '../Footer'
import './index.css'

class SpecificRestaurantDetails extends Component {
  state = {
    restaurantData: {},
    foodItemsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getRestaurantItemDetails()
  }

  getRestaurantItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const accessToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        imageUrl: fetchedData.image_url,
        name: fetchedData.name,
        cuisine: fetchedData.cuisine,
        location: fetchedData.location,
        rating: fetchedData.rating,
        reviewsCount: fetchedData.reviews_count,
        id: fetchedData.id,
        costForTwo: fetchedData.cost_for_two,
      }
      const updatedFoodItems = fetchedData.food_items.map(eachItem => ({
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        cost: eachItem.cost,
        rating: eachItem.rating,
        id: eachItem.id,
      }))
      this.setState({
        restaurantData: updatedData,
        foodItemsList: updatedFoodItems,
        isLoading: false,
      })
    }
  }

  renderFoodItemsList = () => {
    const {foodItemsList} = this.state

    return (
      <ul className="food-items-list">
        {foodItemsList.map(eachFood => (
          <FoodItem key={eachFood.id} foodDetails={eachFood} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurant-details-loader-container"
    >
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantDetailsView = () => {
    const {restaurantData} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantData

    return (
      <div>
        <Navbar />
        <div className="restaurant-details-top-section">
          <img className="food-image" src={imageUrl} alt="restaurant" />
          <div>
            <h1 className="restaurant-top-section-heading">{name}</h1>
            <p className="location-cuisine">{cuisine}</p>
            <p className="location-cuisine">{location}</p>
            <div className="cost-rating-container">
              <div>
                <p className="cost-rating">{rating}</p>
                <p className="restaurant-top-section-reviews">
                  {reviewsCount}+Ratings
                </p>
              </div>
              <hr />
              <div>
                <p className="cost-rating">{costForTwo}</p>
                <p className="cost-for-two-heading">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        {this.renderFoodItemsList()}
        <Footer />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        {isLoading
          ? this.renderLoadingView()
          : this.renderRestaurantDetailsView()}
      </div>
    )
  }
}

export default SpecificRestaurantDetails
