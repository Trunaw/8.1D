import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

useEffect(() => {
  fetch("/api/create-payment-intent", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      console.log("🔔 Response from backend:", data);
      setClientSecret(data.clientSecret);
    })
    .catch(err => console.error("❌ Error:", err));
}, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });
    if (error) alert(error.message);
    else if (paymentIntent.status === "succeeded") alert("Payment successful! Premium unlocked.");
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: 400}}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay $9.99</button>
    </form>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
