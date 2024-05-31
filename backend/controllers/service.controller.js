require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../util/api.error");
const parseRequestError = require("../util/error.parser");
const Service = require("../models/service.model");
const { v2: cloudinary } = require("cloudinary");

/**
 * @param {Request} req
 * @param {Response} res
 * @description creates a service
 * @public
 * @returns the newly created service
 */

const createService = async (req, res) => {
  try {
    const { name } = req.body;

    let image;

    if (!name) {
      throw new BadRequestError([
        {
          path: "name",
          message: "This field is required",
        },
      ]);
    }

    if (!req.file) {
      throw new BadRequestError([
        {
          path: "image",
          message: "This field is required",
        },
      ]);
    }

    cloudinary.uploader.upload(
      req.file.path,
      { public_id: "olympic_flag" },
      async function (error, result) {
        if (error) {
          throw new ApiError(error.message);
        } else {
          image = result.secure_url;

          const service = await Service.create({ name, image });

          res.status(StatusCodes.CREATED).json({
            data: service,
            statusCode: StatusCodes.CREATED,
          });
        }
      }
    );
  } catch (e) {
    throw new BadRequestError(e.message);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @description gets a list of all available services
 * @public
 * @readonly
 * @returns a list of all available services
 */

const getServices = async (req, res) => {
  try {
    const services = await Service.find({}).select("-__v");
    res.status(StatusCodes.OK).json({
      data: services,
      statusCode: StatusCodes.OK,
    });
  } catch (e) {
    throw new BadRequestError(e.message);
  }
};

module.exports = {
  createService,
  getServices,
};
