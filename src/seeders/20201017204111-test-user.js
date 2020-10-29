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
          user_type_id: 2,
          username: "testuser@mail.com",
          password: passwordUtils.generateHash("password"),
          first_name: "Test",
          last_name: "User",
          email: "testuser@mail.com",
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
