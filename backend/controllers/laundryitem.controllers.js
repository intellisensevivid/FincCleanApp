require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const { validationResult, matchedData } = require("express-validator");
const LaundryItem = require("../models/laundryitem.model");
const { BadRequestError, ApiError } = require("../util/api.error");
const parseRequestError = require("../util/error.parser");

const createItem = async (req, res) => {
  try {
    const error = parseRequestError(validationResult(req));

    if (error) {
      throw new BadRequestError(error);
    }

    const { type, price } = matchedData(req);
    const item = await LaundryItem.create({ type, price });

    res.status(StatusCodes.CREATED).json({
      data: item,
      statusCode: StatusCodes.CREATED,
    });
  } catch (e) {
    throw new BadRequestError(e.message);
  }
};

const getItems = async (req, res) => {
  try {
    const items = await LaundryItem.find();
    res
      .status(StatusCodes.OK)
      .json({ data: items, statusCode: StatusCodes.OK });
  } catch (e) {
    throw new ApiError(e.message);
  }
};

module.exports = {
  createItem,
  getItems,
};
