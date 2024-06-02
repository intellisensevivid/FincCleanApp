require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const Country = require("../models/country.model");
const { ApiError } = require("../util/api.error");

const getCountries = async (req, res) => {
  try {
    const countries = await Country.find().select("-_id -__v");
    res
      .status(StatusCodes.OK)
      .json({ data: countries, statusCode: StatusCodes.OK });
  } catch (e) {
    throw new ApiError(e.message);
  }
};

module.exports = { getCountries };
