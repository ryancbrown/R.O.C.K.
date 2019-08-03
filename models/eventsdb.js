/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
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