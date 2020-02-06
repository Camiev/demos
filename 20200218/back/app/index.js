const Koa = require("koa");
const config = require("./utils/config");
const logger = require("./utils/logger");
const errorHandler = require("./utils/handlers/errorHandler");
const router = require("./routes/index");
const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  logger.log({
    level: "info",
    message: `${ctx.method} ${ctx.url} - ${rt}`
  });
});
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});
app.use(router.routes());
app.use(router.allowedMethods());
app.on("error", errorHandler);

const server = app.listen(config.PORT, () => {
  logger.log({
    level: "info",
    message: `Listening on port ${config.PORT}`
  });
});

module.exports = server;
