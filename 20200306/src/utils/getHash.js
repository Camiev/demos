const crypto = require('crypto');

const getHash = payload =>
    crypto
        .createHash('sha256')
        .update(payload)
        .digest('base64');

module.exports = getHash;