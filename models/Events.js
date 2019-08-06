/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define(
    "Events",
    {
      event_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      event_name: {
        type: DataTypes.STRING
        // allowNull: false
      },
      event_type: {
        type: DataTypes.STRING
        // allowNull: false
      },
      event_date: {
        type: DataTypes.STRING
        // allowNull: false
      },
      event_link: {
        type: DataTypes.STRING
        // allowNull: false
      },
      event_location: {
        type: DataTypes.STRING
        // allowNull: true
      },
      event_description: {
        type: DataTypes.STRING
        // allowNull: false
      },
      event_image: {
        type: DataTypes.STRING
        // allowNull: false
      },
      event_price: {
        type: DataTypes.STRING
        // allowNull: false,
        // defaultValue: "$0"
      }
    },
    {
      timestamps: false
    }
  );
  return Events;
};
