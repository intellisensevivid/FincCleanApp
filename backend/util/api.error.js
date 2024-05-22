const { StatusCodes } = require("http-status-codes");

/**
 * @param {string} message
 * @param {number} statusCode
 * @returns {void}
 */
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * @param {string} message
 * @param {number} statusCode
 * @returns {void}
 */
class BadRequestError extends ApiError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = {
  ApiError,
  BadRequestError,
};
