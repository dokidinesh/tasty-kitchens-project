import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          className="username-input-field"
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="password-input-field"
          type="password"
          id="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const accessToken = Cookies.get('jwt_token')

    if (accessToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <div className="responsive-container">
          <img
            className="mobile-login-image"
            src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635597167/Rectangle_1457mobile_login_image_ntdykz.png"
            alt="website login"
          />
          <div className="desktop-inputs-container">
            <form onSubmit={this.submitForm} className="form-container">
              <div className="login-logo-container">
                <img
                  src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635607672/Group_7420websiteLogo_flxsp5.jpg"
                  alt="website logo"
                />
                <h1 className="nav-bar-heading">Tasty Kitchens</h1>
              </div>
              <h1 className="login-heading">Login</h1>
              <div className="input-container">
                {this.renderUsernameField()}
              </div>
              <div className="input-container">
                {this.renderPasswordField()}
              </div>

              <button className="login-button" type="submit">
                Login
              </button>
              {showSubmitError ? <p>{errorMsg}</p> : null}
            </form>
          </div>

          <img
            className="desktop-login-image"
            src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635678898/Rectangle_1456desktop_login_image_mbeg81.png"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}

export default Login
