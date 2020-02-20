const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

  test("Should return a bad gateway", async done => {
    const response = await supertest(app)
      .post("/login")
      .send({ usernaaame: "cami", passssword: "123" });

    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
    done();
  });

  test("Should return an Can't login user error because user doesn't exist", async done => {
    const response = await supertest(app)
      .post("/login")
      .send({ username: "cami", password: "123" });
    expect(response.status).toBe(500);
    expect(response.text).toBe("Can't login user");
    done();
  });

  test("Should return an Can't login user error because Invalid password", async done => {
    await supertest(app)
      .post("/register")
      .send({ username: "caminotpass", password: "123" });
    const response = await supertest(app)
      .post("/login")
      .send({ username: "caminotpass", password: "456" });
    expect(response.status).toBe(500);
    expect(response.text).toBe("Can't login user");
    done();
  });

  test("Should return a successfully login", async done => {
    jest.spyOn(bcrypt, "compare").mockReturnValue(true);
    jest.spyOn(jwt, "sign").mockReturnValue("token");

    await supertest(app)
      .post("/register")
      .send({ username: "camipass", password: "123" });
    const response = await supertest(app)
      .post("/login")
      .send({ username: "camipass", password: "123" });
    expect(response.status).toBe(200);
    expect(response.body.token).toBe("token");
    done();
  });
});
