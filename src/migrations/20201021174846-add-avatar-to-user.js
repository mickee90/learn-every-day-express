"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "Users", // table name
        "avatar", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: "default_avatar",
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Users", "avatar")]);
  },
};
