/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING
    },
    token_expiration: {
      type: DataTypes.DATE
    }
  });
  return User;
};
