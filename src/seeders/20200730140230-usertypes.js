"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "UserTypes",
      [
        {
          name: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("UserTypes", null, {});
  },
};
