import { useStripe } from "@stripe/react-stripe-js";

const CheckoutPage = () => {
  const stripe = useStripe()

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
  const lineItems = [
    {
      quantity: 1,
      price_data: {
        unit_amount: 120000,
        currency: "usd",
        product_data: {
          name: "Charming Countryside House",
          description: "4 nights stay at a beautiful countryside house with 3 bedrooms, 2 bathrooms, and a pool.",
          images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
        }
      }
    }
  ];
//reservation/create-checkout-session line_items: lineItems
  const handleCheckout = async (e) => {
    const response = await fetchFromAPI('reservation/create-checkout-session', {
      body: { line_items: lineItems },
    });

    const { sessionId } = response;
    const { error } = await stripe.redirectToCheckout({
      sessionId
    });
    
    if (error) {
      console.log(error);
    }
  }


  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {lineItems.map((item, index) => (
        <div key={index} className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={item.price_data.product_data.images[0]} alt={item.price_data.product_data.name} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{item.price_data.product_data.name}</div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black">{`$${(item.price_data.unit_amount / 100).toFixed(2)} ${item.price_data.currency.toUpperCase()}`}</p>
            <p className="mt-2 text-gray-500">{item.price_data.product_data.description}</p>
            <button onClick={handleCheckout} className="px-4 py-1 rounded-md bg-indigo-500 text-white mt-4">Checkout</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CheckoutPage