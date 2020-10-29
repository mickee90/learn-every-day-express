"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      status: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ingress: {
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      published_date: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Posts");
  },
};
