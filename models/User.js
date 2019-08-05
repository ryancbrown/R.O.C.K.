/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Login = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Login;
};
