/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    event_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    attendence: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
  return Events;
};
