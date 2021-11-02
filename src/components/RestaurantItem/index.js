import './index.css'
import {Link} from 'react-router-dom'

const RestaurantItem = props => {
  const {restaurantDetails} = props

  const {name, imageUrl, cuisine, userRating, id} = restaurantDetails

  return (
    <Link testid="restaurant-item" to={`/restaurant/${id}`}>
      <li className="restaurant-item">
        <img className="restaurant-image" src={imageUrl} alt="restaurant" />
        <div className="details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="user-rating-container">
            <div className="rating-container">
              <img
                className="star-image"
                src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635618608/7_Rating_fiqp3n.png"
                alt="star"
              />
              <p className="rating">{userRating.rating}</p>
            </div>

            <h1 className="reviews">({userRating.totalReviews} rating)</h1>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
