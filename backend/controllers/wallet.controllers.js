require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const Wallet = require("../models/wallet.model");
const Transaction = require("../models/transaction.model"); //! do not delete this import.
const { BadRequestError } = require("../util/api.error");

/**
 * @param {Request} req
 * @param {Response} req
 * @description returns the wallet detail of the logged in user
 * @protected
 * @returns the wallet object of the logged in user
 */

const getWallet = async (req, res) => {
  try {
    const { _id: user } = req.user;

    const wallet = await Wallet.findOne({ user })
      .select(["-__v", "-user"])
      .populate("transactions", ["-user", "-updatedAt", "-__v"]);

    res.status(StatusCodes.OK).json({
      data: wallet,
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new BadRequestError(e.message);
  }
};

module.exports = {
  getWallet,
};
