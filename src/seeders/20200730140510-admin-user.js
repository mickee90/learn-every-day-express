"use strict";
const passwordUtils = require("../utils/passwordUtils.ts");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(),
          user_type_id: 1,
          username: "admin@led.com",
          password: passwordUtils.generateHash("ledpassword"),
          first_name: "Led",
          last_name: "Admin",
          email: "admin@led.com",
          disabled: false,
          banned: false,
          country_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
