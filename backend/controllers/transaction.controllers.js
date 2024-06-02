require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const { validationResult, matchedData } = require("express-validator");
const Transaction = require("../models/transaction.model");
const Wallet = require("../models/wallet.model");
const { BadRequestError } = require("../util/api.error");
const parseRequestError = require("../util/error.parser");

const createTransaction = async (req, res) => {
  try {
    let amountToUpdate;
    const { _id: user } = req.user;
    const error = parseRequestError(validationResult(req));

    if (error) {
      throw new BadRequestError(error);
    }

    const { type, amount } = matchedData(req);

    // TODO: handle actual amoount removal from the actual bank.

    const transaction = await Transaction.create({ user, type, amount });

    amountToUpdate = type === "Deposit" ? amount : -amount;
    const wallet = await Wallet.findOne({ user });

    if (type === "Withdrawal" && wallet.balance < amount) {
      throw new BadRequestError(
        "You don't have enough balance to withdraw such amount"
      );
    }

    wallet.balance += amountToUpdate;
    wallet.transactions = [...wallet.transactions, transaction._id];
    await wallet.save();

    res.status(StatusCodes.OK).json({
      data: transaction,
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new BadRequestError(e.message);
  }
};

module.exports = {
  createTransaction,
};
