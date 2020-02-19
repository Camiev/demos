const supertest = require("supertest");
const redis = require("redis");
const redis_mock = require("redis-mock");
const logger = require("./../../app/utils/logger");

logger.transports[0].silent = true;
jest.spyOn(redis, "createClient").mockImplementation(redis_mock.createClient);
const app = require("./../../app/index");

describe("Characters", () => {
  afterAll(() => {
    app.close();
  });

  test("Should return an UNAUTHORIZED error because Need authorization", async done => {
    const response = await supertest(app)
      .get("/characters")
      .set("aa", "bb");

    expect(response.status).toBe(401);
    expect(response.text).toBe("Need authorization");
    done();
  });

  test("Should return an UNAUTHORIZED error because Invalid format", async done => {
    const response = await supertest(app)
      .get("/characters")
      .set("Authorization", "Beer");

    expect(response.status).toBe(401);
    expect(response.text).toBe("Invalid format");
    done();
  });

  test("Should return an UNAUTHORIZED error because Invalid token", async done => {
    const response = await supertest(app)
      .get("/characters")
      .set("Authorization", "Bearer 123");

    expect(response.status).toBe(401);
    expect(response.text).toBe("Invalid token");
    done();
  });
});
