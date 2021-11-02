import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

const Navbar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-bar">
      <Link to="/">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635607672/Group_7420websiteLogo_flxsp5.jpg"
            alt="website logo"
          />
          <h1 className="nav-bar-heading">Tasty Kitchens</h1>
        </div>
      </Link>

      <ul className="menu">
        <Link to="/" className="nav-link">
          <li>Home</li>
        </Link>
        <Link to="/cart" className="nav-link">
          <li>Cart</li>
        </Link>
        <Link to="/login" className="nav-link">
          <li>
            <button type="button" className="button" onClick={onClickLogout}>
              Logout
            </button>
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default withRouter(Navbar)
