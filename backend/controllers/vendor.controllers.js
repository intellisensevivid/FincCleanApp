require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const Vendor = require("../models/vendor.model");
const { BadRequestError } = require("../util/api.error");
const parseRequestError = require("../util/error.parser");
const { v2: cloudinary } = require("cloudinary");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @description creates a new vendor
 * @public
 * @returns the newly created vendor
 */

const createVendor = async (req, res) => {
  try {
    const { name, openingTime, closingTime, location } = req.body;
    let image = req.file;

    if (!name || !openingTime || !closingTime || !location || !image) {
      throw new BadRequestError([
        {
          path: "name, openingTime, closingTime, location, image",
          message: "Please enter all fields",
        },
      ]);
    }

    cloudinary.uploader.upload(
      req.file.path,
      { public_id: "olympic_flag" },
      async function (error, result) {
        if (error) {
          console.error("Error uploading");
          throw new ApiError(error.message);
        } else {
          image = result.secure_url;

          try {
            const vendor = await Vendor.create({
              name,
              openingTime,
              closingTime,
              location,
              image,
            });

            res.status(StatusCodes.CREATED).json({
              data: vendor,
              statusCode: StatusCodes.CREATED,
            });
          } catch (e) {
            return res.status(StatusCodes.BAD_REQUEST).json({
              error: e.message,
              statusCode: StatusCodes.BAD_REQUEST,
            });
          }
        }
      }
    );
  } catch (e) {
    console.log("Catch error");
    throw new BadRequestError(e.message);
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @description gets a list of all vendors
 * @public
 * @returns a list of all vendors
 */
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({}).select("-__v").populate("reviews");
    res.status(StatusCodes.OK).json({
      data: vendors,
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new BadRequestError(e.message);
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @description gets a single vendor
 * @public
 * @returns the vendor object that matches the request param :id
 */

const getVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;

    const vendor = await Vendor.findById(vendorId)
      .populate("reviews")
      .select("-__v");
    res.status(StatusCodes.OK).json({
      data: vendor,
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new BadRequestError(e.message);
  }
};

module.exports = {
  createVendor,
  getVendors,
  getVendor,
};
