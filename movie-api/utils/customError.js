class CustomError extends Error {
  /**
   * This is a custom error class to manage all related error response
   * @param {String} message Error message 
   * @param {Number} statusCode Error status code
   * @param {Object} errors  Error object options
   */
  constructor(message, statusCode, errors) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

module.exports = CustomError;
