/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    artist__route_name: {
      type: DataTypes.STRING
    },
    artist__name: {
      type: DataTypes.STRING
    },
    artist__real_name: {
      type: DataTypes.STRING
    },
    artist__email: {
      type: DataTypes.STRING
    },
    artist__medium_genre: {
      type: DataTypes.STRING
    },
    aritist__audience: {
      type: DataTypes.STRING
    },
    artist__demo_youtube: {
      type: DataTypes.STRING
    },
    artist__demo_spotify: {
      type: DataTypes.STRING
    },
    artist__profile_image: {
      type: DataTypes.STRING
    },
    artist__pay_rate: {
      type: DataTypes.INTEGER
    },
    artist__rate_negotiable: {
      type: DataTypes.BOOLEAN
    },
    artist__social_facebook: {
      type: DataTypes.STRING
    },
    artist__social_twitter: {
      type: DataTypes.STRING
    },
    artist__social_youtube: {
      type: DataTypes.STRING
    },
    artist__login_email: {
      type: DataTypes.STRING
    },
    admin_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Artist;
};