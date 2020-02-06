const redis = require("redis");
const logger = require("./../logger");

const client = redis.createClient(process.env.REDIS_URL);

client.on("connect", function() {
  logger.log({
    level: "info",
    message: "Redis client connected"
  });
});

client.on("error", function(err) {
  logger.log({
    level: "error",
    message: `Something went wrong: ${err}`
  });
});

const postUser = async (username, stringifyData) =>
  new Promise((resolve, reject) => {
    client.set(username, stringifyData, (err, result) => {
      if (err) {
        reject(err);
      }
      if (!result) {
        resolve(null);
      }
      resolve(true);
    });
  });

const getUser = username =>
  new Promise((resolve, reject) => {
    client.get(username, (err, result) => {
      if (err) {
        reject(err);
      }
      if (!result) {
        resolve(null);
      }
      resolve(JSON.parse(result));
    });
  });

module.exports = {
  postUser,
  getUser
};
