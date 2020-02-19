const supertest = require("supertest");
const redis = require("redis");
const redis_mock = require("redis-mock");
const logger = require("./../../app/utils/logger");

logger.transports[0].silent = true;
jest.spyOn(redis, "createClient").mockImplementation(redis_mock.createClient);
const app = require("./../../app/index");

describe("Health", () => {
  afterAll(() => {
    app.close();
  });

  test("Should return I'm Ok!", async done => {
    const response = await supertest(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.health).toBe("I'm Ok!");
    done();
  });
});
