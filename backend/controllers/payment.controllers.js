const { config } = require("dotenv");
config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const { StatusCodes } = require("http-status-codes");
const { ApiError } = require("../util/api.error");
const Cart = require("../models/cart.model");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @description handles cart checkout.
 * @returns the client secret
 */

const stripePaymentIntent = async (req, res) => {
  try {
    const { _id: user } = req.user;
    const cart = await Cart.findOne({ user });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(await cart.totalPrice()),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(StatusCodes.OK).send({
      data: { clientSecret: paymentIntent.client_secret },
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new ApiError(e.message);
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @description confirms payment and updates the cart status
 * @returns the cleared cart
 */

const onPaymentSuccess = async (req, res) => {
  try {
    const { _id: user } = req.user;
    const cart = await Cart.findOne({ user });
    cart.status = "Accepted";
    await cart.save();

    res.status(StatusCodes.OK).json({
      data: cart,
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new ApiError(e.message);
  }
};

module.exports = { stripePaymentIntent, onPaymentSuccess };
