const validator = require("@hapi/joi");

const schema = validator.object({
  username: validator
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: validator.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
});

module.exports = schema;
