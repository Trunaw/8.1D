const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 999, // $9.99 in cents
      currency: "aud", // change to "usd" if needed
      automatic_payment_methods: { enabled: true },
      description: "DEV@Deakin Premium Monthly",
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
