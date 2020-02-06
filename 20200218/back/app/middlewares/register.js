const bcrypt = require("bcrypt");
const store = require("../utils/store");
const config = require("../utils/config");
const HttpStatus = require("http-status-codes");

const RegisterMiddleware = async (ctx, next) => {
  try {
    const { username, password } = ctx.request.body;

    const storedUser = await store.getUser(username);
    if (storedUser) {
      ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR, "User exist");
    }

    const newUser = {
      username,
      password: await bcrypt.hash(password, parseInt(config.BCRYPT_SALT))
    };
    const newStoredUser = await store.postUser(
      username,
      JSON.stringify(newUser)
    );

    ctx.body = { register: newStoredUser };
  } catch (error) {
    ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR, "Can't register user");
  }
  await next();
};

module.exports = RegisterMiddleware;
