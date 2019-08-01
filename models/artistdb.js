/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist_real_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    art_medium_genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    audience: {
      type: DataTypes.STRING,
      allowNull: true
    },
    demo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10
    },
    rate_negotiable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    social: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Artist;
};
