const logger = require("../logger/index");

const errorHandler = (error, ctx) => {
  const { request, app, originalUrl, errorDetails } = ctx;
  logger.log({
    level: "error",
    message: error.message,
    errorDetails,
    request: {
      method: request.method,
      url: request.url,
      body: request.body,
      header: request.header
    },
    app,
    originalUrl
  });
};

module.exports = errorHandler;
