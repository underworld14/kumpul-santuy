"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_customer: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "customers",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      id_room: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "rooms",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      duration: {
        type: Sequelize.INTEGER
      },
      is_done: {
        type: Sequelize.BOOLEAN
      },
      is_booked: {
        type: Sequelize.BOOLEAN
      },
      end_time: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("orders");
  }
};
