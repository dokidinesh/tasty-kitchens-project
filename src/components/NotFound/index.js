import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

import './index.css'

const NotFound = () => (
  <div>
    <Navbar />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635608868/notFound_p2am1z.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found. Please go back
        to the home page
      </p>
      <Link to="/">
        <button className="home-page-button" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
