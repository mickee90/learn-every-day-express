import { Sequelize } from "sequelize";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/env_config.js")[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
