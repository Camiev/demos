const supertest = require("supertest");
const redis = require("redis");
const redis_mock = require("redis-mock");
const logger = require("./../../app/utils/logger");

logger.transports[0].silent = true;
jest.spyOn(redis, "createClient").mockImplementation(redis_mock.createClient);
const app = require("./../../app/index");

describe("Register", () => {
  afterAll(() => {
    app.close();
  });

  test("Should return a bad gateway", async done => {
    const response = await supertest(app)
      .post("/register")
      .send({ username: "cami", password: "123", repeat_password: "456" });

    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
    done();
  });

  test("Should return a successfully register because user does'nt exist", async done => {
    const response = await supertest(app)
      .post("/register")
      .send({ username: "cami", password: "123", repeat_password: "123" });
    expect(response.status).toBe(200);
    expect(response.body.register).toBe(true);
    done();
  });
});
