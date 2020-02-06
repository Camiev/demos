const registerSchema = require("./registerSchema");
const loginSchema = require("./loginSchema");
const HttpStatus = require("http-status-codes");

const schemaValidate = async (ctx, next) => {
  const { url, body } = ctx.request;
  const schemas = {
    "/register": registerSchema,
    "/login": loginSchema
  };
  const validate = schemas[url].validate(body);
  if (validate.error) {
    ctx.errorDetails = validate.error;
    ctx.throw(HttpStatus.BAD_REQUEST, "Bad Request");
  } else {
    await next();
  }
};

module.exports = schemaValidate;
