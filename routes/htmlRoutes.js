/* eslint-disable camelcase */
var db = require("../models");

//dispaly events page
module.exports = function(app) {
  app.get("/events", function(req, res) {
    res.render("events");
  });

  // Load events page and pass in an events by id
  app.get("/events", function(req, res) {
    db.Events.findOne({ where: { route_name: req.params.routename } }).then(
      function(Events) {
        res.render("events", {
          events: Events
        });
      }
    );
  });
  // app.get("/events/:id", function(req, res) {
  //   db.Events.findOne({ where: { id: req.params.id } }).then(function(Events) {
  //     res.render("event", {
  //       events: Events
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

module.exports = function(app) {
  app.get("/profile", function(req, res) {
    res.render("profile-input");
  });

  // eslint-disable-next-line no-unused-vars
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
        // do something
      }
    });
  });

  // Load index page
  app.get("/", function(req, res) {
    db.Events.findAll({}).then(function(dbEvents) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbEvents
      });
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
