// Simulates it's a module and will remove the error of colliding imports in other files (e.g modals)
export {};

import * as path from "path";
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
import { sequelize } from "./models/sequelize";

// Enables env variables from .env
require("dotenv").config();

const app = express();

// Enable jwt protections to routes
const passport = require("passport");
require("./config/passport")(passport);

const errorHandling = require("./middlewares/errorHandling");
const notFound = require("./middlewares/notFound");

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

// HTTP request logger middleware
app.use(morgan("common"));

// Middleware which sets various HTTP headers for protection
app.use(helmet());

// app.use(express.static(path.join(__dirname, "uploads")));
// app.use(
//   "/avatars",
//   express.static(path.join(__dirname, "uploads", "avatars")),
//   cors()
// );

// Middleware which enables cors with various options
// Some of the defaults is:
// origin: *
// methods: GET,HEAD,PUT,PATCH,POST,DELETE
// var whitelist = ["http://localhost:8080", "http://localhost:8081", "http://localhost:3000", "http://localhost:3333"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       console.log(origin);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

// Transform incoming request data to json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use(
  "/api/v1/posts",
  passport.authenticate("jwt", { session: false }),
  postRoutes
);
app.use(
  "/api/v1/users",
  passport.authenticate("jwt", { session: false }),
  userRoutes
);
app.use("/api/v1", authRoutes);

app.use(notFound);
app.use(errorHandling);

const port = process.env.PORT || 3000;

// (async () => {
//   await sequelize.sync({ force: true });

//   app.listen(port, () => console.info(`Server running on port ${port}`));
// })();
sequelize.sync().then(
  function () {
    console.log("DB connection sucessful.");
    app.listen(port, () => console.info(`Server running on port ${port}`));
  },
  function (err) {
    // catch error here
    console.log(err);
  }
);
