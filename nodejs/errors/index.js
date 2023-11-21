const CustomError = require("./custom-error");
const BadRequestError = require("./bad-request-error");
const NotFoundError = require("./not-found-error");
const UnauthenticatedError = require("./unauthenticated-error");
const ForbiddenError = require("./forbidden-error");
module.exports = {
  CustomError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  ForbiddenError,
};
