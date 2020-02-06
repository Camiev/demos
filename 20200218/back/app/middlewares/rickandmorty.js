const axios = require("axios");
const config = require("../utils/config");
const HttpStatus = require("http-status-codes");

const RickAndMortyMiddleware = async (ctx, next) => {
  const { RICK_AND_MORTY_API_URL } = config;
  try {
    const response = await axios.get(RICK_AND_MORTY_API_URL);
    const characters = response.data.results.map(character => {
      const { name, status, species, gender, image } = character;
      return {
        name,
        status,
        species,
        gender,
        image
      };
    });
    ctx.body = characters;
  } catch (err) {
    ctx.throw(HttpStatus.BAD_GATEWAY, "Can't get characters");
  }
};

module.exports = RickAndMortyMiddleware;
