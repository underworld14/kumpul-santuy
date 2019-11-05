"use strict";
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    "orders",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      id_customer: DataTypes.INTEGER,
      id_room: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      is_booked: DataTypes.BOOLEAN,
      is_done: DataTypes.BOOLEAN,
      end_time: DataTypes.DATE
    },
    {}
  );
  orders.associate = function(models) {
    orders.belongsTo(models.customers, {
      foreignKey: "id_customer",
      sourceKey: "id"
    });
    orders.belongsTo(models.rooms, {
      foreignKey: "id_room",
      sourceKey: "id"
    });
  };
  return orders;
};
