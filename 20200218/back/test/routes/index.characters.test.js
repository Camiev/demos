const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const axios = require("axios");
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

  test("Should return an BAD_GATEWAY error because call to external server fail", async done => {
    jest.spyOn(jwt, "verify").mockReturnValue("decoded");
    const response = await supertest(app)
      .get("/characters")
      .set("Authorization", "Bearer 123");

    expect(response.status).toBe(502);
    expect(response.text).toBe("Can't get characters");
    done();
  });

  test("Should return a list of characters because call to external server success", async done => {
    jest.spyOn(jwt, "verify").mockReturnValue("decoded");
    const data = {
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: {
            name: "Earth (C-137)",
            url: "https://rickandmortyapi.com/api/location/1"
          },
          location: {
            name: "Earth (Replacement Dimension)",
            url: "https://rickandmortyapi.com/api/location/20"
          },
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        },
        {
          id: 3,
          name: "Summer Smith",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Female",
          origin: {
            name: "Earth (Replacement Dimension)",
            url: "https://rickandmortyapi.com/api/location/20"
          },
          location: {
            name: "Earth (Replacement Dimension)",
            url: "https://rickandmortyapi.com/api/location/20"
          },
          image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg"
        }
      ]
    };
    jest
      .spyOn(axios, "get")
      .mockImplementationOnce(() => Promise.resolve({ data }));
    const response = await supertest(app)
      .get("/characters")
      .set("Authorization", "Bearer 123");

    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("status");
    expect(response.body[0]).toHaveProperty("species");
    expect(response.body[0]).toHaveProperty("gender");
    expect(response.body[0]).toHaveProperty("image");
    done();
  });
});
