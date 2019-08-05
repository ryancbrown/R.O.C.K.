/* eslint-disable camelcase */
var db = require("../models");
var bcrypt = require("bcrypt");
var saltRounds = 10;

//dispaly events page
module.exports = function(app) {
  ///////////////////////////////
  //          EVENTS          //
  ///////////////////////////////
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
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Events.findAll({}).then(function(dbEvents) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbEvents
      });
    });
  });

  ///////////////////////////////
  //          PROFILE          //
  ///////////////////////////////

  app.get("/profile", function(req, res) {
    res.render("profile-input");
  });

  // eslint-disable-next-line no-unused-vars
  app.post("/profile", function(req, res) {
    var req = req.body;
    var route = req.artistName;
    route = route.replace(/\s+/g, "-").toLowerCase();

    db.Artist.update({
      artist__route_name: route,
      artist__real_name: req.contactName,
      artist__name: req.artistName,
      artist__email: req.contactEmail,
      artist__medium_genre: req.artistMedium,
      artist__audience: req.artistAudience,
      artist__demo_youtube: req.youtubeDemo,
      artist__demo__spotify: req.spotifyDemo,
      artist__profile_image: req.profileImage,
      artist__pay_rate: req.artistPay,
      artist__rate_negotiable: req.rateNegotiable,
      artist__social_facebook: req.socialFacebook,
      artist__social_twitter: req.socialTwitter,
      artist__social_youtube: req.socialYoutube,
      admin_approved: req.admin_approved
    }).then(function(res, err) {
      if (err) {
        // log error;
      } else {
        // do something
      }
    });
  });

  ///////////////////////////////
  //           LOGIN           //
  ///////////////////////////////

  // Collect email and password
  // Salt password and store
  // eslint-disable-next-line no-unused-vars
  app.post("/login/create", function(req, res) {
    var req = req.body;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.password, salt);

    userExists(req.email, hash);
    // return res.json({
    //   success: false,
    //   message: "An account with this email exists"
    // });
  });

  function userExists(email, hash) {
    db.Users.findAndCountAll({
      where: {
        email: email
      }
    }).then(function(results) {
      // Check if the email exists
      if (results.count === 1) {
        console.log("user exists");
      } else {
        // If email does not exist add
        db.Users.create({
          email: email,
          password: hash
          // eslint-disable-next-line no-unused-vars
        }).then(function(results, err) {
          createProfile(email);
          console.log("user created");
        });
      }
    });
  }

  // Lookup to see if user exists
  // If so check if password is correct
  app.post("/login", function(req, res) {
    db.Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if (!user) {
        return res.json({
          success: false,
          message: "Invalid email or password"
        });
      } else {
        // If user exists check if password is correct
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          // Password is correct
          if (result === true) {
            // Check to see if profile exists
            checkProfile(req.body.email);
          } else {
            return res.json({
              success: false,
              message: "Invalid email or password"
            });
          }
        });
      }
    });
  });

  function checkProfile(email) {
    db.Artist.findAndCountAll({
      where: {
        artist__login_email: email
      }
    }).then(function(results) {
      if (results.count === 1) {
        return res.json({});
      } else {
        createProfile(email);
      }
    });
  }

  function createProfile(email) {
    db.Artist.create({
      artist__route_name: "",
      artist__name: "",
      artist__real_name: "",
      artist__email: "",
      artist__medium_genre: "",
      aritist__audience: "",
      artist__demo_youtube: "",
      artist__demo_spotify: "",
      artist__profile_image: "",
      artist__pay_rate: 0,
      artist__rate_negotiable: false,
      artist__social_facebook: "",
      artist__social_twitter: "",
      artist__social_youtube: "",
      artist__login_email: email
      // eslint-disable-next-line no-unused-vars
    }).then(function(res, err) {
      console.log("artist profile created");
    });
  }

  // Load example page and pass in an example by id
  app.get("/events/:id", function(req, res) {
    db.Events.findOne({ where: { id: req.params.id } }).then(function(
      dbEvents
    ) {
      res.render("event", {
        example: dbEvents
      });
    });
  });

  app.get("/profile/:routename", function(req, res) {
    db.Artist.findOne({
      where: { artist__route_name: req.params.routename }
    }).then(function(artistdb) {
      res.render("profile", {
        artistProfile: artistdb
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
