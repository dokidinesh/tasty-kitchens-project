import './index.css'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import RestaurantsListView from '../RestaurantsListView'
import Navbar from '../Navbar'
import Footer from '../Footer'
import OffersList from '../OffersList'

const Home = () => {
  const accessToken = Cookies.get('jwt_token')

  if (accessToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <Navbar />

      <OffersList />
      <div className="restaurants-display">
        <RestaurantsListView />
      </div>
      <Footer />
    </div>
  )
}

export default Home
