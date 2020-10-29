module.exports = {
  development: {
    username: "root",
    password: "rootpassword",
    database: "learn-every-day",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "rootpassword",
    database: "learn-every-day-testing",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
};
