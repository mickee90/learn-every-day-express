const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
import { User } from "../models/User";

// Go up one directory, then look for file name
const pathToKey = path.join(__dirname, "../../", "id_rsa_pub.pem");

// The verifying public key
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

var cookieExtractor = function (req) {
  if (!req.headers.cookie) {
    return null;
  }

  const rawCookies = req.headers.cookie.split("; ");

  const parsedCookies = {};
  rawCookies.forEach((rawCookie) => {
    const parsedCookie = rawCookie.split("=");
    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });

  var token = parsedCookies["jwt"] ? parsedCookies["jwt"] : null;

  return token;
};

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jwtFromRequest: cookieExtractor,
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      // Since we are here, the JWT is valid!

      // We will assign the `sub` property on the JWT to the database ID of user
      const user: User = await User.findOne({
        where: { id: jwt_payload.sub },
      });

      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
  );
};
