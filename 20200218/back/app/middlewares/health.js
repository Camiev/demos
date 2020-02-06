const healthMiddleware = (ctx, next) => {
  ctx.body = {
    health: "I'm Ok!"
  };
};

module.exports = healthMiddleware;
