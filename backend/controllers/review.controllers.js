const { validationResult, matchedData } = require("express-validator");
const Review = require("../models/review.model");
const { BadRequestError } = require("../util/api.error");
const parseRequestError = require("../util/error.parser");
const { StatusCodes } = require("http-status-codes");

/**
 * @param {Request} req
 * @param {Response} res
 * @description creates a new review
 * @protected
 * @returns the newly created review
 */

const createReview = async (req, res) => {
  try {
    const user = req.user;
    const error = parseRequestError(validationResult(req));

    if (error) {
      throw new BadRequestError(error);
    }

    const { vendor, rating, comment } = matchedData(req);

    const vendorReviews = await Review.find().and([
      { vendor },
      { user: user._id },
    ]);

    if (vendorReviews.length > 0) {
      throw new BadRequestError("You have already reviewed this vendor");
    }

    const review = await Review.create({ user, vendor, rating, comment });

    res.status(StatusCodes.CREATED).json({
      data: review,
      statusCode: StatusCodes.CREATED,
    });
  } catch (e) {
    throw new BadRequestError(e.message);
  }
};

const getReviews = async (req, res) => {
  try {
    const error = parseRequestError(validationResult(req));

    if (error) {
      throw new BadRequestError(error);
    }

    const { vendor } = matchedData(req);

    const rating = await Review.getAverageReview(vendor);

    const reviews = await Review.find({ vendor })
      .select(["_id", "user", "comment", "rating"])
      .populate("user", ["_id", "fullName", "email"]);

    res.status(StatusCodes.OK).json({
      data: {
        totalRating: rating,
        reviews,
      },
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new BadRequestError(e.message);
  }
};

module.exports = {
  createReview,
  getReviews,
};
