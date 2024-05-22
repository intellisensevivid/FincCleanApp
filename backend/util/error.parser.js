/**
 *
 * @param {Result<ValidationError>} error
 * @returns {Array}
 */
const parseRequestError = (error) => {
  if (!error?.isEmpty()) {
    const errors = error.array();

    const parsedError = errors.map((e) => {
      const { path, msg: message } = e;
      return {
        path,
        message,
      };
    });

    return parsedError;
  }

  return null;
};

module.exports = parseRequestError;
