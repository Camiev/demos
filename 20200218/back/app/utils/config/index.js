module.exports = {
  PORT: process.env.PORT || 3000,
  RICK_AND_MORTY_API_URL:
    process.env.RICK_AND_MORTY_API_URL || "http://localhost",
  JWT_SECRET: process.env.JWT_SECRET || "secreto",
  JWT_MINUTES_EXP: process.env.JWT_MINUTES_EXP || 2,
  BCRYPT_SALT: process.env.BCRYPT_SALT || 10
};
