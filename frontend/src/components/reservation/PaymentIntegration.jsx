import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY)

const PaymentIntegration = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  )
}

export default PaymentIntegration