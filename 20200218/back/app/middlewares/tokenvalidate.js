const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const HttpStatus = require("http-status-codes");

const tokenvalidateMiddleware = async (ctx, next) => {
  const { authorization } = ctx.request.header;

  if (!authorization) {
    ctx.throw(HttpStatus.UNAUTHORIZED, "Need authorization");
  }

  if (authorization.indexOf("Bearer ") == -1) {
    ctx.throw(HttpStatus.UNAUTHORIZED, "Invalid format");
  }

  try {
    const token = authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, config.JWT_SECRET);
    ctx.state.decoded = decoded;
  } catch (err) {
    ctx.throw(HttpStatus.UNAUTHORIZED, "Invalid token");
  }
  await next();
};

module.exports = tokenvalidateMiddleware;
