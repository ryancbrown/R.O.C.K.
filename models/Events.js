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
      },
      event_type: {
        type: DataTypes.STRING
      },
      event_date: {
        type: DataTypes.STRING
      },
      event_link: {
        type: DataTypes.STRING
      },
      event_location: {
        type: DataTypes.STRING
      },
      event_description: {
        type: DataTypes.TEXT
      },
      event_image: {
        type: DataTypes.STRING
      },
      event_price: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
  return Events;
};
