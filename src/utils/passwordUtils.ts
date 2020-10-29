// export {};

const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

// Go up one directory, then look for file name
const pathToKey = path.join(__dirname, "../../", "id_rsa_priv.pem");

// The verifying public key
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validatePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user, withBearer = true) {
  const _id = user.id;
  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: withBearer ? "Bearer " + signedToken : signedToken,
    expires: expiresIn,
  };
}

module.exports.generateHash = generateHash;
module.exports.validatePassword = validatePassword;
module.exports.issueJWT = issueJWT;
