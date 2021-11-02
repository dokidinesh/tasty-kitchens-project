import {withRouter} from 'react-router-dom'
import './index.css'

const PaymentSuccessfulView = props => {
  const onClickGoToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="payment-successfulView">
      <img
        src="https://res.cloudinary.com/dl6nparcj/image/upload/v1635609929/Vectorpayment_success_wxiwik.png"
        alt="payment success"
      />
      <h1>Payment Successful</h1>
      <p>Thank you for ordering Your payment is successfully completed.</p>
      <button type="button" onClick={onClickGoToHome}>
        Go To Home Page
      </button>
    </div>
  )
}

export default withRouter(PaymentSuccessfulView)
