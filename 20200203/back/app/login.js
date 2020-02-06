const axios = require("axios");

const Login = async (ctx, next) => {
  //   const { RICK_AND_MORTY_API_URL } = process.env;
  try {
    // const response = await axios.get(RICK_AND_MORTY_API_URL);
    // ctx.body = response.data.results.map(character => {
    //   const { name, status, species, gender, image } = character;
    //   return {
    //     name,
    //     status,
    //     species,
    //     gender,
    //     image
    //   };
    // });
  } catch (error) {
    const err = new Error("Internal Server Error");
    throw err;
  }
};

module.exports = Login;
