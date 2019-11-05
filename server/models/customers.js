"use strict";
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define(
    "customers",
    {
      identity: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.STRING
    },
    {}
  );
  customers.associate = function(models) {
    customers.belongsToMany(models.rooms, {
      through: "orders",
      foreignKey: "id_customer"
      // as: "room",
      // otherKey: "id_room"
    });
  };
  return customers;
};
