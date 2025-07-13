class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.errors = errors;
  }
}

export default ApiError;
