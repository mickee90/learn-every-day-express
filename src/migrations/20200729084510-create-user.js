"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      user_type_id: {
        allowNull: false,
        defaultValue: 2,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      zip_code: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      disabled: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      banned: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      country_id: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
