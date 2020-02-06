const Router = require("@koa/router");
const koaBody = require("koa-body");

const router = new Router();

const HealthMiddleware = require("../middlewares/health");
const RegisterMiddleware = require("../middlewares/register");
const LoginMiddleware = require("../middlewares/login");
const RickAndMortyMiddleware = require("../middlewares/rickandmorty");
const TokenValidate = require("../middlewares/tokenvalidate");

const schemaValidate = require("../utils/schemas");

router.get("/health", HealthMiddleware);
router.post("/register", koaBody(), schemaValidate, RegisterMiddleware);
router.post("/login", koaBody(), schemaValidate, LoginMiddleware);
router.get("/characters", TokenValidate, RickAndMortyMiddleware);

module.exports = router;
