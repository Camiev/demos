const supertest = require("supertest");
const redis = require("redis");
const redis_mock = require("redis-mock");
const logger = require("./../../app/utils/logger");

logger.transports[0].silent = true;
jest.spyOn(redis, "createClient").mockImplementation(redis_mock.createClient);
const app = require("./../../app/index");

describe("Login", () => {
  afterAll(() => {
    app.close();
  });

  test("Login should return a bad gateway", async done => {
    const response = await supertest(app)
      .post("/login")
      .send({ usernaaame: "cami", passssword: "123" });

    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
    done();
  });
});
