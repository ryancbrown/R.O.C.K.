var db = require("../models");

module.exports = function(app) {
  app.get("/profile", function(req, res) {
    res.render("profile-input");
  });

  app.post("/profile", function(req, res) {
    var req = req.body;
    var route = req.artistName;
    route = route.replace(/\s+/g, "-").toLowerCase();

    db.Artist.create({
      route_name: route,
      artist_real_name: req.contactName,
      artist_name: req.artistName,
      artist_email: req.contactEmail,
      art_medium_genre: req.artistMedium,
      audience: req.artistAudience,
      demo: req.artistDemo,
      profile_image: req.profileImage,
      rate: req.artistPay,
      rate_negotiable: req.rateNegotiable,
      social: req.artistSocial
    }).then(function(res, err) {
      if (err) {
        // log error;
      } else {
        // console.log(res);
      }
    });
  });

  app.get("/profile/:routename", function(req, res) {
    db.Artist.findOne({ where: { route_name: req.params.routename } }).then(
      function(artistdb) {
        res.render("profile", {
          artistProfile: artistdb
        });
      }
    );
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
