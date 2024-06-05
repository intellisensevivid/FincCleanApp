require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const { validationResult, matchedData } = require("express-validator");
const Cart = require("../models/cart.model");
const CartItem = require("../models/cartitem.model");
const { BadRequestError, ApiError } = require("../util/api.error");
const parseRequestError = require("../util/error.parser");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @description returns the cart for the currently logged in user
 * @protected
 * @returns the cart object for the current user
 */

const getCart = async (req, res) => {
  try {
    const { _id: user } = req.user;
    let cart = await Cart.findOne({ user, status: "New" }).populate(
      "orderItems",
      ["_id", "item", "quantity"]
    );

    if (!cart) {
      cart = await Cart.create({ user, status: "New" });
    }

    const totalPrice = await cart?.totalPrice();
    const totalItems = await cart.orderItems.length;

    res.status(StatusCodes.OK).json({
      data: {
        cart,
        totalPrice,
        totalItems,
      },
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
 * @description returns the cart for the currently logged in user
 * @protected
 * @returns the cart object for the current user
 */

const addToCart = async (req, res) => {
  try {
    const error = parseRequestError(validationResult(req));

    if (error) {
      throw new BadRequestError(error);
    }

    const { _id: user } = req.user;
    const { item, quantity } = matchedData(req);
    let cart = await Cart.findOne({ user, status: "New" });

    if (!cart) {
      cart = await Cart.create({ user, status: "New" });
    }

    let orderItem = await CartItem.findOne({ item, order: cart._id });

    if (!orderItem) {
      // if no order item exists, create a new one.

      orderItem = await CartItem.create({ item, quantity, order: cart._id });
      cart.orderItems.push(orderItem._id);
      await cart.save();
    } else {
      if (quantity == 0) {
        // remove the orderitem from the cart

        const newOrderItems = cart.orderItems.filter((e) => {
          return e.toString() != orderItem._id.toString();
        });
        cart.orderItems = newOrderItems;
        await cart.save();
        await CartItem.findOneAndDelete({ item, order: cart });
      } else {
        // update the cart quantity

        orderItem.quantity = quantity;
        await orderItem.save();
      }
    }

    res.status(StatusCodes.OK).json({
      data: cart,
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new BadRequestError(e.message);
  }
};

module.exports = { getCart, addToCart };
