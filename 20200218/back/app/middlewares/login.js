const bcrypt = require("bcrypt");
const store = require("../utils/store");
const config = require("../utils/config");
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");

const LoginMiddleware = async (ctx, next) => {
  try {
    const { username, password } = ctx.request.body;

    const storedUser = await store.getUser(username);
    if (!storedUser) {
      ctx.throw(HttpStatus.UNAUTHORIZED, "Unknown user");
    }

    const isValidPassword = await bcrypt.compare(password, storedUser.password);
    if (!isValidPassword) {
      ctx.throw(HttpStatus.UNAUTHORIZED, "Invalid password");
    }
    const token = getToken(storedUser.username);

    ctx.body = { token };
  } catch (error) {
    ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR, "Can't login user");
  }
};

const getToken = username => {
  const options = {
    expiresIn: 60 * config.JWT_MINUTES_EXP
  };
  const token = jwt.sign({ username: username }, config.JWT_SECRET, options);
  return token;
};

module.exports = LoginMiddleware;
