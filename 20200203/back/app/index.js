const Koa = require("koa");
const Router = require("@koa/router");
const koaBody = require("koa-body");

const app = new Koa();
const router = new Router();

const RegisterMiddleware = require("./register");
const LoginMiddleware = require("./login");
const RickAndMortyMiddleware = require("./rickandmorty");

router.get("/health", (ctx, next) => {
  ctx.body = {
    health: "I'm Ok!"
  };
});
router.get("/characters", RickAndMortyMiddleware);
router.post("/register", koaBody(), RegisterMiddleware);
router.post("/login", koaBody(), LoginMiddleware);

// app.use(async (ctx, next) => {
//   await next();
//   const rt = ctx.response.get("X-Response-Time");
//   console.log(`${ctx.method} ${ctx.url} - ${rt}`);
// });
// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   ctx.set("X-Response-Time", `${ms}ms`);
// });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
