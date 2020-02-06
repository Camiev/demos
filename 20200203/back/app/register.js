const axios = require("axios");

const Register = async (ctx, next) => {
  try {
    console.log(ctx.request.body);
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
    ctx.body = "hi";
  } catch (error) {
    const err = new Error("Internal Server Error");
    throw err;
  }
};

module.exports = Register;
