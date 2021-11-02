import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick-theme.css'

class OffersList extends Component {
  state = {offersList: [], isLoading: true}

  componentDidMount() {
    this.getOfferDetails()
  }

  getOfferDetails = async () => {
    const accessToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(offer => ({
        imageUrl: offer.image_url,
        id: offer.id,
      }))
      this.setState({offersList: updatedData, isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div
      testid="restaurants-offers-loader"
      className="restaurant-details-loader-container"
    >
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderOffersCarousel = () => {
    const settings = {
      dots: true,
      slidesToShow: 1,
      speed: 500,
      slidesToScroll: 1,
    }

    const {offersList} = this.state
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {offersList.map(offerItem => (
            <img src={offerItem.imageUrl} key={offerItem.id} alt="offer" />
          ))}
        </Slider>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        {isLoading ? this.renderLoadingView() : this.renderOffersCarousel()}
      </div>
    )
  }
}

export default OffersList
