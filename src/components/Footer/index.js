import {Component} from 'react'

import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="logo-title-container">
        <img
          src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635662958/Frame_275footer_logo_j63nwg.png"
          alt="website-footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchens </h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food. Contact us on
      </p>
      <ul className="icons-list">
        <li>
          <FaPinterestSquare
            testid="pintrest-social-icon"
            className="icon-image"
          />
        </li>
        <li>
          <FaInstagram testid="instagram-social-icon" className="icon-image" />
        </li>
        <li>
          <FaTwitter testid="twitter-social-icon" className="icon-image" />
        </li>
        <li>
          <FaFacebookSquare
            testid="facebook-social-icon"
            className="icon-image"
          />
        </li>
      </ul>
    </div>
  )
}
