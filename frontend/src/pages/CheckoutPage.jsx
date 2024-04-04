import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutPage = () => {
  const stripe = useStripe()
  const elements = useElements();

  const API = 'http://localhost:4000/api';

  async function fetchFromAPI(endpoint, opts) {
    const { method, body } = { method: 'POST', body: null, ...opts };
    const res = await fetch(`${API}/${endpoint}`, {
      method,
      credentials: 'include',
      ...(body && { body: JSON.stringify(body) }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  }
  const reservationDetails = {
    checkin: "2024/04/10",
    checkout: "2024/04/11",
    guests: {
      adults: 1,
      children: 0,
      infants: 0
    }
  };
  // {phone: '0561019597', otp: '147852'}
  // reservation/create-checkout-session/65f5b85f45220b24fff7d222
  // reservationDetails
  const handleCheckout = async (e) => {
    const response = await fetchFromAPI('reservation/create-checkout-session/65f5b85f45220b24fff7d223', {
      body: reservationDetails,
    });

    const { sessionId } = response;
    const { error } = await stripe.redirectToCheckout({
      sessionId
    });
    
    if (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {token, error} = await stripe.createToken(cardElement, { 'currency': 'dzd' });

    if (error) {
      console.log('[error]', error);
    } else {
      const response = await fetchFromAPI('user/add-card', {
        body: {token, idCard: 'url-img', email: 'karim@gmail.com', bio: 'hodisl sldki', gender: 'Male'},
      });
  console.log('response', response)
      
      // Here you would send the token to your server for use
      // sendTokenToServer(token);
    }
  }


  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    
        <div className="md:flex border-b-2 border-red">
          <div className="md:flex-shrink-0">
            {/* <img className="h-48 w-full object-cover md:w-48" src={item.price_data.product_data.images[0]} alt={item.price_data.product_data.name} /> */}
          </div>
          <div className="p-8">
            {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{item.price_data.product_data.name}</div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black">{`$${(item.price_data.unit_amount / 100).toFixed(2)} ${item.price_data.currency.toUpperCase()}`}</p>
            <p className="mt-2 text-gray-500">{item.price_data.product_data.description}</p> */}
            <button onClick={handleCheckout} className="px-4 py-1 rounded-md bg-indigo-500 text-white mt-4">Checkout</button>
          </div>
        </div>

        <div className="h-screen w-full bg-white shadow-xl p-5">

          <form onSubmit={handleSubmit}>
            <CardElement options={{
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
}} />
            <button type="submit" disabled={!stripe}>
              Add Card
            </button>
          </form>
        </div>
      
    </div>
  )
}

export default CheckoutPage